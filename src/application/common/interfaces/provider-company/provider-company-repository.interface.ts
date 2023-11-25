import { ConnectionArguments } from 'graphql-relay';
import { ProviderCompany } from '@domain/provider-company/provider-company';

export interface IProviderCompanyRepository {
  create(dto: ProviderCompany): Promise<ProviderCompany>;
  update(dto: ProviderCompany): Promise<void>;
  findOneById(id: string): Promise<ProviderCompany>;
  findAll(options?: ConnectionArguments): Promise<Array<ProviderCompany>>;
}
