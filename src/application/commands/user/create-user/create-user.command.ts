import { ICommand } from '@nestjs/cqrs';
import { CreateUserInput } from 'src/domain/user/dtos/create-user.input';

export class CreateUserCommand implements ICommand {
  constructor(public readonly dto: CreateUserInput) {}
}
