import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindAllProviderCompaniesQuery } from './find-all-provider-companies.query';
import { IProviderCompanyRepository } from 'src/application/common/interfaces/provider-company/provider-company-repository.interface';
import { PROVIDER_REPOSITORY_TOKEN } from 'src/application/common/constants/tokens';
import { Inject } from '@nestjs/common';
import { ProviderCompany } from 'src/domain/provider-company/provider-company';

@QueryHandler(FindAllProviderCompaniesQuery)
class FindAllProviderCompaniesHandler
  implements IQueryHandler<FindAllProviderCompaniesQuery>
{
  constructor(
    @Inject(PROVIDER_REPOSITORY_TOKEN)
    private readonly providerRepository: IProviderCompanyRepository,
  ) {}

  async execute(): Promise<ProviderCompany[]> {
    return await this.providerRepository.findAll();
  }
}

export default FindAllProviderCompaniesHandler;
