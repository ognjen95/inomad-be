import { CreateProviderCompanyInput } from 'src/domain/provider-company/dtos/create-provider-company.input';

export class CreateProviderCompanyCommand {
  constructor(public readonly dto: CreateProviderCompanyInput) {}
}
