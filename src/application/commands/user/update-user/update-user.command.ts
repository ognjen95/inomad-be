import { UpdateUserInput } from '@domain/user/dtos/update-user.input';

export class UpdateUserCommand {
  constructor(public readonly dto: UpdateUserInput) {}
}
