export interface FileEntity {
  id: string;
  url: string;
  metadata: string | null;
  created_at: Date;
  updated_at: Date;
}
