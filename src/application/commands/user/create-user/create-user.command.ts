import { ICommand } from '@nestjs/cqrs';
import { CreateUserDto } from 'src/application/common/dtos/user/create-user.dto';

export class CreateUserCommand implements ICommand {
  constructor(public readonly dto: CreateUserDto) {}
}
