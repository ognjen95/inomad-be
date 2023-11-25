import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AuthenticateUserCommand } from './authenticate-user.command';

import { IAuthService } from '@application/common/interfaces/auth/auth.interface';
import { Inject } from '@nestjs/common';
import { AUTH_SERVICE_TOKEN } from '@application/common/constants/tokens';
import { AuthReturn } from '@application/common/types/auth-return';

@CommandHandler(AuthenticateUserCommand)
class AuthenticateUserHandler
  implements ICommandHandler<AuthenticateUserCommand>
{
  constructor(
    @Inject(AUTH_SERVICE_TOKEN) private readonly authService: IAuthService,
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateUserCommand): Promise<AuthReturn> {
    const { accessToken, refreshToken, idToken } =
      await this.authService.authenticateUser(email, password);

    return {
      accessToken,
      refreshToken,
      idToken,
    };
  }
}

export default AuthenticateUserHandler;
