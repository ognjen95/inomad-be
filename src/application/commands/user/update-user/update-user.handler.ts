import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateUserCommand } from './update-user.command';
import { User } from '@domain/user/entity/user';
import { Inject, NotFoundException } from '@nestjs/common';
import { USER_REPOSITORY_TOKEN } from '@application/common/constants/tokens';
import { IUserRepository } from '@application/common/interfaces/user/user-repository.interface';

@CommandHandler(UpdateUserCommand)
class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
  constructor(
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute({ dto }: UpdateUserCommand): Promise<User> {
    const user = await this.userRepository.findOneById(dto.id);

    if (!user) {
      throw new NotFoundException(`User with id ${dto.id} not found`);
    }

    user.updateUser(dto);

    return await this.userRepository.update(dto.id, user);
  }
}

export default UpdateUserHandler;
