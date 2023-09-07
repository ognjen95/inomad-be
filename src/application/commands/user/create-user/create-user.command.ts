import { ICommand } from '@nestjs/cqrs';
import { CreateUserInput } from 'src/domain/user/dtos/create-user.input';
import { CurrentUserInfo } from 'src/presentation/resolvers/auth/types';

export class CreateUserCommand implements ICommand {
  constructor(
    public readonly dto: CreateUserInput,
    public readonly currentUser: CurrentUserInfo,
  ) {}
}
