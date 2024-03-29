import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindProviderCompanyByIdQuery } from './find-provider-company-by-id.query';
import { IProviderCompanyRepository } from '@application/common/interfaces/provider-company/provider-company-repository.interface';
import { PROVIDER_REPOSITORY_TOKEN } from '@application/common/constants/tokens';
import { Inject } from '@nestjs/common';
import { ProviderCompany } from '@domain/provider-company/entity/provider-company';

@QueryHandler(FindProviderCompanyByIdQuery)
class FindProviderCompanyByIdHandler
  implements IQueryHandler<FindProviderCompanyByIdQuery>
{
  constructor(
    @Inject(PROVIDER_REPOSITORY_TOKEN)
    private readonly providerRepository: IProviderCompanyRepository,
  ) {}

  async execute({
    id,
  }: FindProviderCompanyByIdQuery): Promise<ProviderCompany> {
    return this.providerRepository.findOneById(id);
  }
}

export default FindProviderCompanyByIdHandler;
