import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Req,
  Res,
  UseGuards,
} from "@nestjs/common";
import {
  ApiBody,
  ApiCookieAuth,
  ApiExtraModels,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { Response } from "express";
import {
  ApiResponseType,
  JwtAuthGuard,
  JwtRefreshGuard,
  LoginGuard,
} from "../../../common";
import {
  AuthUseCaseIdentifiers,
  GetCookieWithJwtRefreshUseCase,
  GetCookieWithJwtUseCase,
  GetOneUserByIdUseCase,
  IRequest,
  LogoutUseCase,
  RegisterUseCase,
  UserUseCaseIdentifiers,
} from "../../../core";
import { ApiUser } from "../user/models";
import { LoginDto, RegisterDto } from "./models";

@Controller("auth")
@ApiTags("auth")
@ApiResponse({
  status: 401,
  description: "No authorization token was found",
})
@ApiResponse({ status: 500, description: "Internal error" })
@ApiExtraModels(ApiUser)
export class AuthController {
  constructor(
    @Inject(UserUseCaseIdentifiers.registerUseCase)
    private readonly registerUseCase: RegisterUseCase,
    @Inject(AuthUseCaseIdentifiers.getCookieWithJwtUseCase)
    private readonly getCookieWithJwtUseCase: GetCookieWithJwtUseCase,
    @Inject(AuthUseCaseIdentifiers.getCookieWithJwtRefreshUseCase)
    private readonly getCookieWithJwtRefreshUseCase: GetCookieWithJwtRefreshUseCase,
    @Inject(AuthUseCaseIdentifiers.logoutUseCase)
    private readonly logoutUseCase: LogoutUseCase,
    @Inject(UserUseCaseIdentifiers.getOneUserByIdUseCase)
    private readonly getOneUserByIdUseCase: GetOneUserByIdUseCase,
  ) {}

  @Post("register")
  @ApiResponseType(ApiUser, false, 201)
  async register(
    @Body() registerDto: RegisterDto,
    @Res() response: Response,
  ): Promise<Response<ApiUser>> {
    const user = await this.registerUseCase.execute(registerDto);

    return response.status(201).send(new ApiUser(user));
  }

  @Post("login")
  @UseGuards(LoginGuard)
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 200, description: "Login successful" })
  async login(
    @Req() request: IRequest,
    @Res() response: Response,
  ): Promise<Response> {
    const { user } = request;

    const accessTokenCookie = await this.getCookieWithJwtUseCase.execute({
      user,
    });
    const refreshTokenCookie =
      await this.getCookieWithJwtRefreshUseCase.execute({ user });

    request.res.setHeader("Set-Cookie", [
      accessTokenCookie,
      refreshTokenCookie,
    ]);
    return response.status(200).send();
  }

  @Post("logout")
  @ApiCookieAuth()
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, description: "Logout successful" })
  async logout(
    @Req() request: IRequest,
    @Res() response: Response,
  ): Promise<Response> {
    const cookie = await this.logoutUseCase.execute(request.user.id);
    request.res.setHeader("Set-Cookie", cookie);
    return response.status(200).send();
  }

  @Get("me")
  @ApiCookieAuth()
  @UseGuards(JwtAuthGuard)
  @ApiResponseType(ApiUser, false, 200)
  async me(@Req() request: IRequest): Promise<ApiUser> {
    const user = await this.getOneUserByIdUseCase.execute({
      id: request.user.id,
    });

    return new ApiUser(user);
  }

  @Get("refresh")
  @ApiCookieAuth()
  @UseGuards(JwtRefreshGuard)
  @ApiResponse({ status: 200, description: "Refresh success" })
  async refresh(
    @Req() request: IRequest,
    @Res() response: Response,
  ): Promise<Response> {
    const accessTokenCookie = await this.getCookieWithJwtUseCase.execute({
      user: request.user,
    });
    request.res.setHeader("Set-Cookie", accessTokenCookie);
    return response.status(200).send();
  }
}
