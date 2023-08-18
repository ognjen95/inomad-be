import { Module } from '@nestjs/common';
import { ProviderCompanyResolver } from '../../resolvers/provider-company/provider-company.resolver';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import CreateProviderCompanyHandler from 'src/application/commands/provider-company/create-provider-company/provider-compay.handler';
import {
  PROVIDER_REPOSITORY_TOKEN,
  USER_REPOSITORY_TOKEN,
} from 'src/application/common/constants/tokens';
import { ProviderCompanyRepository } from 'src/infrastructure/repositories/provider-company/provider-company.repository';
import { UserRepository } from 'src/infrastructure/repositories/user/user.repository';
import FindProviderCompanyByIdHandler from 'src/application/queries/provider-company/find-provider-company-by-id/find-provider-company-by-id.handler';

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
    CreateProviderCompanyHandler,
    FindProviderCompanyByIdHandler,
  ],
})
export class ProviderCompanyModule {}
