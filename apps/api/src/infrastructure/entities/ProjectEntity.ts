export interface ProjectEntity {
  id: string;
  name: string;
  description: string | null;
  created_at: Date;
  updated_at: Date;
  user_id: string;
}
