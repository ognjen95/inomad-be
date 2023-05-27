import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from './create-user.command';
import { User } from 'src/domain/user/User';
import { Inject } from '@nestjs/common';
import {
  TIME_OFF_TOKEN,
  USER_REPOSITORY_TOKEN,
} from 'src/application/common/constants/tokens';
import { IUserRepository } from 'src/application/common/interfaces/user/user-repository.interface';
import { ITimeOffRepository } from 'src/application/common/interfaces/time-off/time-off-repository.interface';
import { TimeOff } from 'src/domain/time-off/TimeOff';

@CommandHandler(CreateUserCommand)
class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: IUserRepository,

    @Inject(TIME_OFF_TOKEN)
    private readonly timeOffRepository: ITimeOffRepository,
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

    const timeOffs = await this.timeOffRepository.findAll();
    const createdUser = await this.userRepository.create(user);

    Promise.all(
      timeOffs.edges.map(async ({ node }) => {
        const newTimeOff = new TimeOff(
          node.getName,
          node.getForYear,
          node.getTotalDays,
        );

        newTimeOff.setEmployeeId = createdUser.getId;

        return await this.timeOffRepository.create(newTimeOff);
      }),
    );

    return createdUser;
  }
}

export default CreateUserHandler;
