import {
  IUseCase,
  ILoggerService,
  IHashService,
  AuthModel,
} from "../../domain";
import {
  AppServiceIdentifiers,
  GlobalServiceIdentifiers,
} from "../../../infrastructure";
import { Inject, Injectable } from "@nestjs/common";
import { IAuthService } from "../../domain/adapters/services/IAuthService";

interface RegisterUser {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

@Injectable()
export class RegisterUseCase
  implements IUseCase<RegisterUser, Promise<AuthModel>>
{
  constructor(
    @Inject(GlobalServiceIdentifiers.loggerService)
    private readonly logger: ILoggerService,
    @Inject(AppServiceIdentifiers.authService)
    private readonly authService: IAuthService,
    @Inject(AppServiceIdentifiers.hashService)
    private readonly hashService: IHashService,
  ) {}

  async execute({
    email,
    password,
    firstName,
    lastName,
  }: RegisterUser): Promise<AuthModel> {
    const hashedPassword = await this.hashService.hash(password);

    const hashedUser = {
      email,
      password: hashedPassword,
      firstName,
      lastName,
    };

    const userCreated = await this.authService.registerNewUser(hashedUser);

    this.logger.log(
      "RegisterUseCases execute",
      `The user ${email} have been registered.`,
    );

    return userCreated;
  }
}
