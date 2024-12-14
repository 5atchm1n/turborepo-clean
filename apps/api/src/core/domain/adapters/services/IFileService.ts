import { CreateFileModel, FileModel } from "../../models";

export interface IFileService {
  getFileById(id: string): Promise<FileModel>;
  uploadFile(file: CreateFileModel): Promise<FileModel>;
  deleteFile(id: string): Promise<FileModel>;
  getFilesByIds(fileIds: string[]): Promise<FileModel[]>;
}
