import { CaseStatus } from 'src/domain/case/enums';
import { CreateCaseInput } from './create-case.input';
import {
  InputType,
  Field,
  PartialType,
  registerEnumType,
} from '@nestjs/graphql';

@InputType()
export class UpdateCaseInput extends PartialType(CreateCaseInput) {
  @Field(() => String)
  id: string;

  @Field(() => CaseStatus, { nullable: true })
  status: CaseStatus;

  @Field(() => String, { nullable: true })
  providerCompanyId: string;

  @Field(() => String, { nullable: true })
  employerCompanyId: string;
}

registerEnumType(CaseStatus, {
  name: 'CaseStatus',
});
