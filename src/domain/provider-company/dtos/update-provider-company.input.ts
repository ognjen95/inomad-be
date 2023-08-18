import { InputType, Field, PartialType } from '@nestjs/graphql';
import { CreateProviderCompanyInput } from './create-provider-company.input';

@InputType()
export class UpdateProviderCompanyInput extends PartialType(
  CreateProviderCompanyInput,
) {
  @Field()
  id: string;
}
