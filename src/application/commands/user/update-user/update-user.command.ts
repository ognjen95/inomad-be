import { UpdateUserDto } from 'src/domain/user/dtos/update-user.dts';

export class UpdateUserCommand {
  constructor(public readonly dto: UpdateUserDto) {}
}
