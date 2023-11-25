import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RemoveUserCommand } from './remove-user.command';
import { Inject } from '@nestjs/common';
import { USER_REPOSITORY_TOKEN } from '@application/common/constants/tokens';
import { IUserRepository } from '@application/common/interfaces/user/user-repository.interface';

@CommandHandler(RemoveUserCommand)
class RemoveUserHandler implements ICommandHandler<RemoveUserCommand> {
  constructor(
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute({ id }: RemoveUserCommand): Promise<any> {
    return await this.userRepository.remove(id);
  }
}

export default RemoveUserHandler;
