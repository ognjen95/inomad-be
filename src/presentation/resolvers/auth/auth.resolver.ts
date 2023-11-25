import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthReturn } from '@application/common/types/auth-return';
import { CommandBus } from '@nestjs/cqrs';
import { AuthenticateUserCommand } from '@application/commands/auth/authenticate-user/authenticate-user.command';
import { IsPublic } from '@presentation/decorators/is-public';

@Resolver(() => AuthReturn)
export class AuthResolver {
  constructor(private readonly commandBus: CommandBus) {}

  @IsPublic()
  @Mutation(() => AuthReturn)
  async login(
    @Args('email') email: string,
    @Args('password') password: string,
  ) {
    return await this.commandBus.execute<AuthenticateUserCommand>(
      new AuthenticateUserCommand(email, password),
    );
  }
}
