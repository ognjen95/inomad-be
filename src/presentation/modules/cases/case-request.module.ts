import { Module } from '@nestjs/common';
import { CaseRequestResolver } from '../../resolvers/cases/case-request.resolver';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import CreateCaseRequestHandler from 'src/application/commands/cases/create-case request/create-case-request.handler';
import {
  CASE_REPOSITORY_TOKEN,
  CASE_REQUEST_REPOSITORY_TOKEN,
  CHAT_SERVICE_TOKEN,
  PROVIDER_REPOSITORY_TOKEN,
  USER_REPOSITORY_TOKEN,
} from 'src/application/common/constants/tokens';
import { CaseRequestRepository } from 'src/infrastructure/repositories/case/case-request.repository';
import { ProviderCompanyRepository } from 'src/infrastructure/repositories/provider-company/provider-company.repository';
import { UserRepository } from 'src/infrastructure/repositories/user/user.repository';
import UpdateCaseRequestHandler from 'src/application/commands/cases/update-case-request/update-case-request.handler';
import { CaseRepository } from 'src/infrastructure/repositories/case/case.repository';
import { ChatService } from 'src/application/services/chat/chat-service';

@Module({
  imports: [CqrsModule],
  providers: [
    CaseRequestResolver,
    PrismaService,
    {
      provide: CASE_REQUEST_REPOSITORY_TOKEN,
      useClass: CaseRequestRepository,
    },
    {
      provide: USER_REPOSITORY_TOKEN,
      useClass: UserRepository,
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
      provide: CHAT_SERVICE_TOKEN,
      useClass: ChatService,
    },
    CreateCaseRequestHandler,
    UpdateCaseRequestHandler,
  ],
})
export class CaseRequestModule {}
