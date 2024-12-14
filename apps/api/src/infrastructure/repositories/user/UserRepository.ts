import { Injectable } from "@nestjs/common";
import { IUserRepository } from "../../../core";
import { UserEntity } from "../../entities";
import { PrismaService } from "../../adapters";
import { User } from "@prisma/client";
import { UserCreateFailedException, UserNotFoundException } from "./exceptions";

@Injectable()
export class UserRepository implements IUserRepository<User> {
  constructor(private readonly prisma: PrismaService) {}

  async insert(user: UserEntity): Promise<User> {
    try {
      return await this.prisma.user.create({
        data: user,
      });
    } catch (error) {
      throw new UserCreateFailedException();
    }
  }

  async findByEmail(email: string): Promise<User> {
    try {
      return await this.prisma.user.findUniqueOrThrow({
        where: { email },
      });
    } catch (error) {
      throw new UserNotFoundException(email);
    }
  }

  async findById(id: string): Promise<User> {
    try {
      return await this.prisma.user.findUniqueOrThrow({
        where: { id },
      });
    } catch (error) {
      throw new UserNotFoundException(id);
    }
  }

  async updateById(id: string, user: Partial<UserEntity>): Promise<User> {
    try {
      return await this.prisma.user.update({
        where: { id },
        data: user,
      });
    } catch (error) {
      throw new UserNotFoundException(id);
    }
  }

  async updateRefreshToken(id: string, refreshToken: string): Promise<void> {
    try {
      await this.prisma.user.update({
        where: { id },
        data: { refresh_token: refreshToken },
      });
    } catch (error) {
      throw new UserNotFoundException(id);
    }
  }
}
