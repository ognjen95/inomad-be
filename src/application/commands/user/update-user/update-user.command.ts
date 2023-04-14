import { UpdateUserDto } from 'src/application/common/dtos/user/update-user.dts';

export class UpdateUserCommand {
  constructor(public readonly dto: UpdateUserDto) {}
}
