import { Module } from '@nestjs/common';
import { CaseRequestResolver } from '../../resolvers/cases/case-request.resolver';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaService } from '@infrastructure/prisma/prisma.service';
import CreateCaseRequestHandler from '@application/commands/cases/create-case request/create-case-request.handler';
import {
  CASE_REPOSITORY_TOKEN,
  CASE_REQUEST_REPOSITORY_TOKEN,
  CHAT_SERVICE_TOKEN,
  PROVIDER_REPOSITORY_TOKEN,
  USER_REPOSITORY_TOKEN,
} from '@application/common/constants/tokens';
import { CaseRequestRepository } from '@infrastructure/repositories/case/case-request.repository';
import { ProviderCompanyRepository } from '@infrastructure/repositories/provider-company/provider-company.repository';
import { UserRepository } from '@infrastructure/repositories/user/user.repository';
import UpdateCaseRequestHandler from '@application/commands/cases/update-case-request/update-case-request.handler';
import { CaseRepository } from '@infrastructure/repositories/case/case.repository';
import { ChatService } from '@application/services/chat/chat-service';
import CreateCaseProposalHandler from '@application/commands/cases/create-case-proposal/create-case-proposal.handler';

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
    CreateCaseProposalHandler,
  ],
})
export class CaseRequestModule {}
