import { UpdateUserInput } from 'src/domain/user/dtos/update-user.input';

export class UpdateUserCommand {
  constructor(public readonly dto: UpdateUserInput) {}
}
