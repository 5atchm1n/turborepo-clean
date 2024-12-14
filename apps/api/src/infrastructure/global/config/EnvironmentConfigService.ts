import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { IConfigService, TokenType } from "../../../core";

@Injectable()
export class EnvironmentConfigService implements IConfigService {
  constructor(private readonly configService: ConfigService) {}

  getTokenSecret(type: TokenType): string {
    return type === TokenType.ACCESS
      ? this.getJwtSecret()
      : this.getJwtRefreshSecret();
  }

  getTokenExpirationTime(type: TokenType): string {
    return type === TokenType.ACCESS
      ? this.getJwtExpirationTime()
      : this.getJwtRefreshExpirationTime();
  }

  getAwsRegion(): string {
    return this.configService.getOrThrow<string>("AWS_REGION");
  }

  getAwsEndpoint(): string {
    return this.configService.getOrThrow<string>("AWS_ENDPOINT");
  }

  getAwsAccessKeyId(): string {
    return this.configService.getOrThrow<string>("AWS_ACCESS_KEY_ID");
  }

  getAwsSecretAccessKey(): string {
    return this.configService.getOrThrow<string>("AWS_SECRET_ACCESS_KEY");
  }

  getBucketName(): string {
    return this.configService.getOrThrow<string>("BUCKET_NAME");
  }

  private getJwtSecret(): string {
    return this.configService.getOrThrow<string>("JWT_SECRET");
  }

  private getJwtExpirationTime(): string {
    return this.configService.getOrThrow<string>("JWT_EXPIRATION_TIME");
  }

  private getJwtRefreshSecret(): string {
    return this.configService.getOrThrow<string>("JWT_REFRESH_TOKEN_SECRET");
  }

  private getJwtRefreshExpirationTime(): string {
    return this.configService.getOrThrow<string>(
      "JWT_REFRESH_TOKEN_EXPIRATION_TIME",
    );
  }
}
