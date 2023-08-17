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

  async execute({ dto }: CreateUserCommand) {
    try {
      const { firstName, lastName, middleName, email, password, userRole } =
        dto;
      const user = new User(
        firstName,
        middleName ?? '',
        lastName,
        email,
        password,
        userRole,
      );

      console.log({ userRole });

      await this.userRepository.create(user);

      return {
        isCompleted: true,
      };
    } catch (error) {
      return {
        isCompleted: false,
        errorMsg: "Couldn't create user",
        error: error.message,
      };
    }
  }
}

export default CreateUserHandler;
