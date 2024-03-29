import { CaseRequestStatus } from '../enums';
import { InputType, Field, registerEnumType } from '@nestjs/graphql';

@InputType()
export class UpdateCaseRequestInput {
  @Field()
  id: string;

  @Field(() => CaseRequestStatus, { defaultValue: CaseRequestStatus.PENDING })
  status: CaseRequestStatus;
}

registerEnumType(CaseRequestStatus, {
  name: 'CaseRequestStatus',
});
