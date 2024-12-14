export interface TokenPayload {
  sub: string;
  user: {
    id: string;
    email: string;
  };
}
