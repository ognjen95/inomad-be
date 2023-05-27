import { ICommand } from '@nestjs/cqrs';
import { CreateUserDto } from 'src/domain/user/dtos/create-user.dto';

export class CreateUserCommand implements ICommand {
  constructor(public readonly dto: CreateUserDto) {}
}
