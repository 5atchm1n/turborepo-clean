import { CreateFileModel, FileModel } from "../../core";
import { FileEntity } from "../entities";
import { S3FileEntity } from "../repositories";

export class FileMappers {
  private constructor() {}

  static toS3Entity(file: CreateFileModel): Partial<S3FileEntity> {
    return {
      name: file.file.originalname,
      data: file.file.buffer,
    };
  }

  static toFileEntity(
    file: CreateFileModel,
    s3File: S3FileEntity,
  ): Partial<FileEntity> {
    return {
      metadata: file.metadata,
      url: s3File.url,
    };
  }

  static toModel(entity: FileEntity): FileModel {
    return {
      id: entity.id,
      url: entity.url,
      metadata: entity.metadata ?? "",
      createdAt: entity.created_at,
      updatedAt: entity.updated_at,
    };
  }
}
