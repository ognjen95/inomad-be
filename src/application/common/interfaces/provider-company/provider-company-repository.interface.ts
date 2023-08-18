import { ProviderCompany } from 'src/domain/provider-company/provider-company';
import { UserQueryOptionsInput } from 'src/domain/user/dtos/query-options.input';

export interface IProviderCompanyRepository {
  create(dto: ProviderCompany): Promise<ProviderCompany>;
  update(dto: ProviderCompany): Promise<void>;
  findOneById(id: string): Promise<ProviderCompany>;
  findAll(options: UserQueryOptionsInput): Promise<Array<ProviderCompany>>;
}
