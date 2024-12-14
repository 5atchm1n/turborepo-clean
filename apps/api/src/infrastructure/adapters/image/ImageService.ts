import { Inject, Injectable } from "@nestjs/common";
import {
  CreateImageModel,
  FileModel,
  IFileService,
  IImageRepository,
  IImageService,
  ImageModel,
} from "../../../core";
import { ImageEntity } from "../../entities";
import { ImageMapper } from "../../mappers";
import { RepositoryIdentifiers } from "../../repositories";
import { AppServiceIdentifiers } from "../AppServiceIdentifiers";

@Injectable()
export class ImageService implements IImageService {
  constructor(
    @Inject(RepositoryIdentifiers.imageRepository)
    private readonly imageRepository: IImageRepository<ImageEntity>,
    @Inject(AppServiceIdentifiers.fileService)
    private readonly fileService: IFileService,
  ) {}

  async createImages(images: CreateImageModel[]): Promise<ImageModel[]> {
    return await Promise.all(
      images.map((image) => {
        return this.createImage(image);
      }),
    );
  }

  async createImage(image: CreateImageModel): Promise<ImageModel> {
    if (!image.file.originalname) throw new Error("Image filename is required");
    const file = await this.fileService.uploadFile({
      file: image.file,
      metadata: image.metadata ?? "",
    });
    const imageEntity = ImageMapper.toEntity(image, file);
    const newImage = await this.imageRepository.insert(imageEntity);
    return ImageMapper.toModel(newImage, file);
  }

  async getImagesByProjectId(projectId: string): Promise<ImageModel[]> {
    const images = await this.imageRepository.findByProjectId(projectId);
    const files = await this.fileService.getFilesByIds(
      images.map((image) => image.file_id),
    );
    return this.toImageModelList(images, files);
  }

  async getImageById(id: string): Promise<ImageModel> {
    const image = await this.imageRepository.findById(id);
    const file = await this.fileService.getFileById(image.id);
    return ImageMapper.toModel(image, file);
  }

  async getImages(): Promise<ImageModel[]> {
    const images = await this.imageRepository.findAll();
    const files = await this.fileService.getFilesByIds(
      images.map((image) => image.file_id),
    );
    return this.toImageModelList(images, files);
  }

  async deleteImage(id: string): Promise<ImageModel> {
    const image = await this.imageRepository.deleteImage(id);
    const file = await this.fileService.deleteFile(image.file_id);
    return ImageMapper.toModel(image, file);
  }

  private toImageModelList(
    images: ImageEntity[],
    files: FileModel[],
  ): ImageModel[] {
    return images.reduce((acc: ImageModel[], image) => {
      const file = files.find((file) => file.id === image.file_id);
      if (!file) throw new Error("File not found");
      acc.push(ImageMapper.toModel(image, file));
      return acc;
    }, []);
  }
}
