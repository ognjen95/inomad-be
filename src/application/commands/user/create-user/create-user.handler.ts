import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from './create-user.command';
import { User } from 'src/domain/user/User';
import { Inject } from '@nestjs/common';
import { USER_REPOSITORY_TOKEN } from 'src/application/common/constants/tokens';
import { IUserRepository } from 'src/application/common/interfaces/user/user-repository.interface';

@CommandHandler(CreateUserCommand)
class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute({ dto }: CreateUserCommand): Promise<User> {
    const { firstName, lastName, email, password, employmentStatus } = dto;
    const user = new User(
      firstName,
      lastName,
      email,
      password,
      employmentStatus,
    );
    return await this.userRepository.create(user);
  }
}

export default CreateUserHandler;
