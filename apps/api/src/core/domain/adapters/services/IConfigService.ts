export enum TokenType {
  ACCESS = "access",
  REFRESH = "refresh",
}

export interface IConfigService {
  getTokenSecret(type: TokenType): string;
  getTokenExpirationTime(type: TokenType): string;
  getAwsRegion(): string;
  getAwsEndpoint(): string;
  getAwsAccessKeyId(): string;
  getAwsSecretAccessKey(): string;
  getBucketName(): string;
}
