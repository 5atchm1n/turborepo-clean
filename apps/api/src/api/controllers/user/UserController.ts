import {
  Body,
  Controller,
  HttpStatus,
  Inject,
  Post,
  Res,
} from "@nestjs/common";
import { ApiExtraModels, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ApiUser, SubscribeNewsletterDto } from "./models";
import {
  SubscribeNewsletterUsecase,
  UserUseCaseIdentifiers,
} from "../../../core";
import { Response } from "express";
import { ApiResponseType } from "../../../common";

@ApiTags("user")
@ApiExtraModels(ApiUser)
@ApiResponse({
  status: 401,
  description: "No authorization token was found",
})
@ApiResponse({ status: 500, description: "Internal error" })
@Controller("user")
export class UserController {
  constructor(
    @Inject(UserUseCaseIdentifiers.subscribeNewsletterUseCase)
    private readonly subscribeNewsletterUsecase: SubscribeNewsletterUsecase,
  ) {}

  @Post("newsletter")
  @ApiResponseType(ApiUser, false, HttpStatus.CREATED)
  async subscribeNewsletter(
    @Body() dto: SubscribeNewsletterDto,
    @Res() res: Response,
  ): Promise<Response<ApiUser>> {
    const user = await this.subscribeNewsletterUsecase.execute({
      email: dto.email,
      subscribe: dto.subscribe ?? true,
    });
    return res.status(HttpStatus.CREATED).send(new ApiUser(user));
  }
}
