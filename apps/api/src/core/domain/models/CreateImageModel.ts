export interface CreateImageModel {
  name: string;
  file: Express.Multer.File;
  description: string;
  metadata?: string;
}
