import { Inject } from "@nestjs/common";
import {
  CreateFileModel,
  FileModel,
  IDBFileRepository,
  IFileRepository,
  IFileService,
} from "../../../core";
import { FileEntity } from "../../entities";
import { FileMappers } from "../../mappers";
import { RepositoryIdentifiers, S3FileEntity } from "../../repositories";

export class FileService implements IFileService {
  constructor(
    @Inject(RepositoryIdentifiers.fileRepository)
    private readonly fileRepository: IDBFileRepository<FileEntity>,
    @Inject(RepositoryIdentifiers.s3FileRepository)
    private readonly s3Repository: IFileRepository<S3FileEntity>,
  ) {}

  async uploadFile(file: CreateFileModel): Promise<FileModel> {
    const s3FileEntity = FileMappers.toS3Entity(file);
    const s3File = await this.s3Repository.save(s3FileEntity);
    const savedFile = await this.fileRepository.save(
      FileMappers.toFileEntity(file, s3File),
    );
    return FileMappers.toModel(savedFile);
  }

  async getFilesByIds(fileIds: string[]): Promise<FileModel[]> {
    const files = await this.fileRepository.findByIds(fileIds);
    return files.map((file) => FileMappers.toModel(file));
  }

  async getFileById(fileId: string): Promise<FileModel> {
    const file = await this.fileRepository.findById(fileId);
    return FileMappers.toModel(file);
  }

  async deleteFile(id: string): Promise<FileModel> {
    const file = await this.fileRepository.delete(id);
    await this.s3Repository.delete(file.url);
    return FileMappers.toModel(file);
  }
}
