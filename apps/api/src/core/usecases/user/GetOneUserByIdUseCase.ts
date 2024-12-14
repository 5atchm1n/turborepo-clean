import { Inject, Injectable } from "@nestjs/common";
import { AppServiceIdentifiers } from "../../../infrastructure";
import { IUseCase, IUserService, UserModel } from "../../domain";

interface GetOneUserByIdCommands {
  id: string;
}

@Injectable()
export class GetOneUserByIdUseCase
  implements IUseCase<GetOneUserByIdCommands, Promise<UserModel>>
{
  constructor(
    @Inject(AppServiceIdentifiers.userService)
    private readonly userService: IUserService,
  ) {}

  async execute({ id }: GetOneUserByIdCommands): Promise<UserModel> {
    return await this.userService.getUserById(id);
  }
}
