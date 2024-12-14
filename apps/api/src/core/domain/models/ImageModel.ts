import { FileModel } from "./FileModel";

export interface ImageModel {
  id: string;
  name: string;
  file: FileModel;
  description: string;
}
