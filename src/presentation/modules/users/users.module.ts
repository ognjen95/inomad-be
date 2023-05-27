import { Module } from '@nestjs/common';
import { UsersResolver } from '../../resolvers/users/users.resolver';
import { CqrsModule } from '@nestjs/cqrs/dist/cqrs.module';
import CreateUserHandler from 'src/application/commands/user/create-user/create-user.handler';
import { UserRepository } from 'src/infrastructure/repositories/user/user.repository';
import { PrismaModule } from 'src/infrastructure/prisma/prisma.module';
import FindAllUsersHandler from 'src/application/queries/users/find-all/find-all-users.handler';
import {
  TIME_OFF_TOKEN,
  USER_REPOSITORY_TOKEN,
} from 'src/application/common/constants/tokens';
import FindUserByIdQueryHandler from 'src/application/queries/users/find-user-by-id/find-user-by-id.handler';
import UpdateUserHandler from 'src/application/commands/user/update-user/update-user.handler';
import RemoveUserHandler from 'src/application/commands/user/remove-user/remove-user.handler';
import { TimeOffRepository } from 'src/infrastructure/repositories/time-off/time-off.repository';

@Module({
  imports: [CqrsModule],
  providers: [
    PrismaModule,
    UsersResolver,
    {
      provide: USER_REPOSITORY_TOKEN,
      useClass: UserRepository,
    },
    {
      provide: TIME_OFF_TOKEN,
      useClass: TimeOffRepository,
    },
    CreateUserHandler,
    UpdateUserHandler,
    FindAllUsersHandler,
    RemoveUserHandler,
    FindUserByIdQueryHandler,
  ],
})
export class UsersModule {}
