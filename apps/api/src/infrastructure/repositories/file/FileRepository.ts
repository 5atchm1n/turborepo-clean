import { IDBFileRepository } from "../../../core";
import { PrismaService } from "../../adapters";
import { FileEntity } from "../../entities";
import { Injectable } from "@nestjs/common";

@Injectable()
export class FileRepository implements IDBFileRepository<FileEntity> {
  constructor(private readonly prisma: PrismaService) {}

  async save(file: FileEntity): Promise<FileEntity> {
    try {
      return await this.prisma.file.create({
        data: file,
      });
    } catch (error) {
      throw new Error("File save failed");
    }
  }

  async findByIds(fileIds: string[]): Promise<FileEntity[]> {
    try {
      return await this.prisma.file.findMany({
        where: {
          id: {
            in: fileIds,
          },
        },
      });
    } catch (error) {
      throw new Error("Get all files failed");
    }
  }

  async findById(fileId: string): Promise<FileEntity> {
    try {
      return await this.prisma.file.findUniqueOrThrow({
        where: { id: fileId },
      });
    } catch (error) {
      throw new Error(`Could not find file with id: ${fileId}`);
    }
  }

  async delete(id: string): Promise<FileEntity> {
    try {
      return await this.prisma.file.delete({
        where: { id },
      });
    } catch (error) {
      throw new Error(`Could not delete file with id: ${id}`);
    }
  }
}
