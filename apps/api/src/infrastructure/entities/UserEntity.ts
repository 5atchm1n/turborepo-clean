export interface UserEntity {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  last_login: Date;
  refresh_token: string;
  newsletter: boolean;
  created_at: Date;
  updated_at: Date;
}
