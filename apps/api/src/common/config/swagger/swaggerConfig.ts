import { DocumentBuilder, OpenAPIObject } from "@nestjs/swagger";

export function swaggerConfig(): Omit<OpenAPIObject, "paths"> {
  return new DocumentBuilder()
    .addCookieAuth("Authorization", {
      type: "http",
      in: "cookie",
      scheme: "bearer",
      description: "JWT token",
    })
    .setTitle("We Are Splash API")
    .setDescription("The We Are Splash API description")
    .setVersion("1.0")
    .build();
}
