import { Inject, Injectable } from "@nestjs/common";
import { AppServiceIdentifiers } from "../../../infrastructure";
import {
  IUseCase,
  IUserService,
  NewsletterSubscribeModel,
  UserModel,
} from "../../domain";

@Injectable()
export class SubscribeNewsletterUsecase
  implements IUseCase<NewsletterSubscribeModel, UserModel>
{
  constructor(
    @Inject(AppServiceIdentifiers.userService)
    private readonly userService: IUserService,
  ) {}

  async execute(
    newsletterSubscribeModel: NewsletterSubscribeModel,
  ): Promise<UserModel> {
    return await this.userService.subscribeNewsletter(newsletterSubscribeModel);
  }
}
