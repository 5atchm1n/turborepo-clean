import { Injectable } from "@nestjs/common";
import { IProjectRepository } from "../../../core";
import { PrismaService } from "../../adapters";
import { ProjectEntity } from "../../entities";
import {
  ProjectCreateFailedException,
  ProjectNotFoundException,
} from "./exceptions";

@Injectable()
export class ProjectRepository implements IProjectRepository<ProjectEntity> {
  constructor(private readonly prisma: PrismaService) {}

  async insertWithImages(
    project: ProjectEntity,
    imageId: string[],
  ): Promise<ProjectEntity> {
    try {
      return await this.prisma.project.create({
        data: {
          ...project,
          images: { connect: imageId.map((id) => ({ id })) },
        },
      });
    } catch (error) {
      throw new ProjectCreateFailedException();
    }
  }

  async insert(project: ProjectEntity): Promise<ProjectEntity> {
    try {
      return await this.prisma.project.create({
        data: project,
      });
    } catch (error) {
      throw new ProjectCreateFailedException();
    }
  }

  async findById(id: string): Promise<ProjectEntity> {
    try {
      return await this.prisma.project.findUniqueOrThrow({
        where: { id },
      });
    } catch (error) {
      throw new ProjectNotFoundException();
    }
  }

  async findAll(): Promise<ProjectEntity[]> {
    try {
      return this.prisma.project.findMany();
    } catch (error) {
      throw new ProjectNotFoundException();
    }
  }
}
