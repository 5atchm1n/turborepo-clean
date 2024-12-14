import { Inject, Injectable } from "@nestjs/common";
import {
  IUseCase,
  IUserService,
  UserModel,
  NewsletterSubscribeModel,
} from "../../domain";
import { AppServiceIdentifiers } from "../../../infrastructure";

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
