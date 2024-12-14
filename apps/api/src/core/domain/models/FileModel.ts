export interface FileModel {
  id: string;
  url: string;
  metadata: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateFileModel {
  file: Express.Multer.File;
  metadata: string;
}
