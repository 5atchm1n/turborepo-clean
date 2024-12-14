import { IUserService, IUseCase, UserModel } from "../../domain";
import { AppServiceIdentifiers } from "../../../infrastructure";
import { Inject, Injectable } from "@nestjs/common";

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
