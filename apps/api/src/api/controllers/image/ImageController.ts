import {
  Body,
  Controller,
  Inject,
  Post,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import {
  CreateNewImageUseCase,
  ImagePayload,
  ImageUseCaseIdentifiers,
} from "../../../core/usecases/image";
import { ApiImage } from "./model";

export class FileDto {
  constructor(
    public readonly name: string,
    public readonly description: string,
  ) {}
}

@Controller("image")
export class ImageController {
  constructor(
    @Inject(ImageUseCaseIdentifiers.createImage)
    private readonly createImageUseCase: CreateNewImageUseCase,
  ) {}

  @Post("upload")
  @UseInterceptors(FileInterceptor("file"))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: FileDto,
  ): Promise<ApiImage> {
    const image = await this.createImageUseCase.execute(
      this.createImagePayload(file, body),
    );
    return new ApiImage(image);
  }

  private createImagePayload(
    file: Express.Multer.File,
    body: FileDto,
  ): ImagePayload {
    return {
      name: body.name,
      description: body.description,
      file: file,
    };
  }
}
