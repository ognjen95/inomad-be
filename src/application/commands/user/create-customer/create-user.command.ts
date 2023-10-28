import { ICommand } from '@nestjs/cqrs';
import { CreateUserInput } from 'src/domain/user/dtos/create-user.input';
import { UserRoles } from 'src/domain/user/enums';

export class CreateCustomerCommand implements ICommand {
  constructor(public readonly dto: CreateUserInput) {
    dto.userRole = UserRoles.CUSTOMER;
  }
}
