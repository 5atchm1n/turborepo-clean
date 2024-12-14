import {
  DeleteObjectCommand,
  PutObjectCommand,
  PutObjectCommandInput,
  S3Client,
} from "@aws-sdk/client-s3";
import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import * as mime from "mime";
import slugify from "slugify";
import { IConfigService, IExceptions, IFileRepository } from "../../../core";
import { GlobalServiceIdentifiers } from "../../global";

export interface S3FileEntity {
  name: string;
  data?: Buffer;
  url?: string;
}

export class FileUploadFailed extends IExceptions {
  constructor(error: Error) {
    super("file.upload.failed", error.message);
    this.errorStatus = HttpStatus.UNPROCESSABLE_ENTITY;
  }
}

@Injectable()
export class S3FileRepository implements IFileRepository<S3FileEntity> {
  private readonly s3Client: S3Client;
  private readonly bucketName: string;
  private readonly awsRegion: string;
  private readonly awsEndpoint: string;
  private readonly awsAccessKeyId: string;
  private readonly awsSecretAccessKey: string;
  private readonly protocol: string = "https";

  constructor(
    @Inject(GlobalServiceIdentifiers.environmentConfigService)
    private readonly configService: IConfigService,
  ) {
    this.bucketName = configService.getBucketName();
    this.awsRegion = configService.getAwsRegion();
    this.awsEndpoint = configService.getAwsEndpoint();
    this.awsAccessKeyId = configService.getAwsAccessKeyId();
    this.awsSecretAccessKey = configService.getAwsSecretAccessKey();

    this.s3Client = new S3Client({
      region: this.awsRegion,
      endpoint: `${this.protocol}://${this.awsEndpoint}`,
      credentials: {
        accessKeyId: this.awsAccessKeyId,
        secretAccessKey: this.awsSecretAccessKey,
      },
    });
  }

  async save(file: S3FileEntity): Promise<S3FileEntity> {
    const fileKey: string = this.setFilekey(file.name);
    const uploadParams: PutObjectCommandInput = {
      Bucket: this.bucketName,
      Key: fileKey,
      Body: file.data,
      ACL: "public-read",
      ContentType: mime.lookup(file.name) || "application/octet-stream",
    };
    try {
      await this.s3Client.send(new PutObjectCommand(uploadParams));
      return {
        name: file.name,
        url: this.getFileUrl(fileKey),
      };
    } catch (error) {
      throw new FileUploadFailed(error as Error);
    }
  }

  async delete(url: string): Promise<S3FileEntity> {
    const fileKey = this.extractFileKeyFromUrl(url);
    const deleteParams = {
      Bucket: this.bucketName,
      Key: fileKey,
    };

    try {
      await this.s3Client.send(new DeleteObjectCommand(deleteParams));
      return { name: fileKey, url };
    } catch (error) {
      throw new FileUploadFailed(error as Error);
    }
  }

  private extractFileKeyFromUrl(url: string): string {
    const urlParts = url.split("/");
    return urlParts[urlParts.length - 1];
  }

  private setFilekey(name: string): string {
    const extension = name.split(".").pop();
    const fileName = name.replace(`.${extension}`, "");
    return `${slugify(fileName, { lower: true })}-${Date.now().toString()}.${extension}`;
  }

  private getFileUrl(fileKey: string): string {
    return `${this.protocol}://${this.bucketName}.${this.awsEndpoint}/${fileKey}`;
  }
}
