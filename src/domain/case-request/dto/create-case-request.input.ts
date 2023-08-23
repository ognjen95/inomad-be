import { InputType, Field, registerEnumType } from '@nestjs/graphql';
import { CaseRequestStatus } from '../enums';

@InputType()
export class CreateCaseRequestInput {
  @Field()
  applicantId: string;

  @Field()
  providerCompanyId: string;

  @Field()
  caseId: string;
}

registerEnumType(CaseRequestStatus, {
  name: 'CaseRequestStatus',
});
