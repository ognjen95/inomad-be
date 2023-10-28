import { Module } from '@nestjs/common';
import { CasesResolver } from '../../resolvers/cases/cases.resolver';
import { CqrsModule } from '@nestjs/cqrs/dist/cqrs.module';
import { PrismaModule } from 'src/infrastructure/prisma/prisma.module';
import { CaseRepository } from 'src/infrastructure/repositories/case/case.repository';
import {
  CASE_REPOSITORY_TOKEN,
  CASE_REQUEST_REPOSITORY_TOKEN,
  CHAT_SERVICE_TOKEN,
  DOCUMENTS_REPOSITORY_TOKEN,
} from 'src/application/common/constants/tokens';
import CreateCaseHandler from 'src/application/commands/cases/update-case/update-case.handler';
import { UpdateCaseCommand } from 'src/application/commands/cases/update-case/update-case.command';
import FindAllCasesHandler from 'src/application/queries/cases/find-all-cases/find-all-cases.handler';
import FindCaseByIdHandler from 'src/application/queries/cases/find-case-by-id/find-case-by-id.handler';
import FindAllCaseRequestsHandler from 'src/application/queries/cases/find-all-case-requests/find-all-case-requests.handler';
import { CaseRequestRepository } from 'src/infrastructure/repositories/case/case-request.repository';
import { DocumentRepository } from 'src/infrastructure/repositories/document/document.repository';
import UpdateCaseGeneralInfoHandler from 'src/application/commands/cases/update-general-info/update-general-info.handler';
import UpdateCaseEducationInfoHandler from 'src/application/commands/cases/update-education-info/update-education-info.handler';
import UpdateCaseWorkInfoHandler from 'src/application/commands/cases/update-work-info/update-work-info.handler';
import UpdateFamilyInfoHandler from 'src/application/commands/cases/update-family-info/update-family-info.handler';
import AssignProviderHandler from 'src/application/commands/cases/assign-provider/assign-provider.handler';
import { ChatService } from 'src/application/services/chat/chat-service';

@Module({
  imports: [CqrsModule],
  providers: [
    CasesResolver,
    PrismaModule,
    {
      provide: CASE_REPOSITORY_TOKEN,
      useClass: CaseRepository,
    },
    {
      provide: CASE_REQUEST_REPOSITORY_TOKEN,
      useClass: CaseRequestRepository,
    },
    {
      provide: DOCUMENTS_REPOSITORY_TOKEN,
      useClass: DocumentRepository,
    },
    {
      provide: CHAT_SERVICE_TOKEN,
      useClass: ChatService,
    },
    CreateCaseHandler,
    UpdateCaseCommand,
    FindAllCasesHandler,
    FindCaseByIdHandler,
    FindAllCaseRequestsHandler,
    UpdateCaseGeneralInfoHandler,
    UpdateCaseEducationInfoHandler,
    UpdateCaseWorkInfoHandler,
    UpdateFamilyInfoHandler,
    AssignProviderHandler,
  ],
})
export class CasesModule {}
