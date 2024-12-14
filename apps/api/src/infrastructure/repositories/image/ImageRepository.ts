import { Injectable } from "@nestjs/common";
import { IImageRepository } from "../../../core";
import { PrismaService } from "../../adapters";
import { ImageEntity } from "../../entities";
import { ImageCreationFailedError, ImageNotFoundError } from "./exceptions";

@Injectable()
export class ImageRepository implements IImageRepository<ImageEntity> {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: string): Promise<ImageEntity> {
    try {
      return this.prisma.image.findUniqueOrThrow({
        where: { id },
      });
    } catch (error) {
      throw new ImageNotFoundError("Image not found");
    }
  }

  async findAll(): Promise<ImageEntity[]> {
    try {
      return this.prisma.image.findMany();
    } catch (error) {
      throw new ImageNotFoundError("Image not found");
    }
  }

  async insert(image: ImageEntity): Promise<ImageEntity> {
    try {
      return await this.prisma.image.create({
        data: image,
      });
    } catch (error) {
      throw new ImageCreationFailedError();
    }
  }

  async deleteImage(id: string): Promise<ImageEntity> {
    try {
      return await this.prisma.image.delete({
        where: { id },
      });
    } catch (error) {
      throw new ImageNotFoundError("Image not found");
    }
  }

  async findByProjectId(projectId: string): Promise<ImageEntity[]> {
    try {
      return await this.prisma.image.findMany({
        where: { projects: { some: { id: projectId } } },
      });
    } catch (error) {
      throw new ImageNotFoundError("Image not found");
    }
  }
}
