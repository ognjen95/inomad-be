import { Module } from '@nestjs/common';
import { ProviderCompanyResolver } from '../../resolvers/provider-company/provider-company.resolver';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaService } from '@infrastructure/prisma/prisma.service';
import CreateProviderCompanyHandler from '@application/commands/provider-company/create-provider-company/provider-compay.handler';
import {
  AUTH_SERVICE_TOKEN,
  CASE_REPOSITORY_TOKEN,
  CHAT_SERVICE_TOKEN,
  PROVIDER_REPOSITORY_TOKEN,
  USER_REPOSITORY_TOKEN,
} from '@application/common/constants/tokens';
import { ProviderCompanyRepository } from '@infrastructure/repositories/provider-company/provider-company.repository';
import { UserRepository } from '@infrastructure/repositories/user/user.repository';
import FindProviderCompanyByIdHandler from '@application/queries/provider-company/find-provider-company-by-id/find-provider-company-by-id.handler';
import { UserOnboardingService } from '@application/services/onboarding/user-onboarding.service';
import { CaseRepository } from '@infrastructure/repositories/case/case.repository';
import { AuthService } from '@application/services/auth/auth-service';
import FindAllProviderCompaniesHandler from '@application/queries/provider-company/find-all-provider-companies/find-all-provider-companies.handler';
import { ChatService } from '@application/services/chat/chat-service';

@Module({
  imports: [CqrsModule],
  providers: [
    ProviderCompanyResolver,
    PrismaService,
    {
      provide: PROVIDER_REPOSITORY_TOKEN,
      useClass: ProviderCompanyRepository,
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
      provide: AUTH_SERVICE_TOKEN,
      useClass: AuthService,
    },
    {
      provide: CHAT_SERVICE_TOKEN,
      useClass: ChatService,
    },
    CreateProviderCompanyHandler,
    FindProviderCompanyByIdHandler,
    UserOnboardingService,
    FindAllProviderCompaniesHandler,
  ],
})
export class ProviderCompanyModule {}
