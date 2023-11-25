import { Module } from '@nestjs/common';
import { UsersResolver } from '../../resolvers/users/users.resolver';
import { CqrsModule } from '@nestjs/cqrs/dist/cqrs.module';
import CreateUserHandler from '@application/commands/user/create-user/create-user.handler';
import { UserRepository } from '@infrastructure/repositories/user/user.repository';
import { PrismaModule } from '@infrastructure/prisma/prisma.module';
import FindAllUsersHandler from '@application/queries/users/find-all/find-all-users.handler';
import {
  AUTH_SERVICE_TOKEN,
  CASE_REPOSITORY_TOKEN,
  CHAT_SERVICE_TOKEN,
  PROVIDER_REPOSITORY_TOKEN,
  TIME_OFF_TOKEN,
  USER_REPOSITORY_TOKEN,
} from '@application/common/constants/tokens';
import FindUserByIdQueryHandler from '@application/queries/users/find-user-by-id/find-user-by-id.handler';
import UpdateUserHandler from '@application/commands/user/update-user/update-user.handler';
import RemoveUserHandler from '@application/commands/user/remove-user/remove-user.handler';
import { TimeOffRepository } from '@infrastructure/repositories/time-off/time-off.repository';
import { CaseRepository } from '@infrastructure/repositories/case/case.repository';
import { UserOnboardingService } from '@application/services/onboarding/user-onboarding.service';
import { ProviderCompanyRepository } from '@infrastructure/repositories/provider-company/provider-company.repository';
import { AuthService } from '@application/services/auth/auth-service';
import CreateCustomerHandler from '@application/commands/user/create-customer/create-user.handler';
import { ChatService } from '@application/services/chat/chat-service';

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
    {
      provide: CASE_REPOSITORY_TOKEN,
      useClass: CaseRepository,
    },
    {
      provide: PROVIDER_REPOSITORY_TOKEN,
      useClass: ProviderCompanyRepository,
    },
    {
      provide: AUTH_SERVICE_TOKEN,
      useClass: AuthService,
    },
    {
      provide: CHAT_SERVICE_TOKEN,
      useClass: ChatService,
    },
    UserOnboardingService,
    AuthService,
    CreateUserHandler,
    UpdateUserHandler,
    FindAllUsersHandler,
    RemoveUserHandler,
    FindUserByIdQueryHandler,
    CreateCustomerHandler,
  ],
})
export class UsersModule {}
