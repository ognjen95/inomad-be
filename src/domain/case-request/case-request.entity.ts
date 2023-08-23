import { ObjectType, Field, registerEnumType } from '@nestjs/graphql';
import { CaseRequestStatus } from './enums';

@ObjectType()
export class CaseRequestEntity {
  @Field()
  id: string;

  @Field()
  applicantId: string;

  @Field()
  providerCompanyId: string;

  @Field()
  caseId: string;

  @Field(() => CaseRequestStatus, { defaultValue: CaseRequestStatus.PENDING })
  status: CaseRequestStatus;

  @Field(() => Date, { defaultValue: new Date() })
  createdAt: Date;

  @Field(() => Date, { defaultValue: new Date() })
  updatedAt: Date;
}

registerEnumType(CaseRequestStatus, {
  name: 'CaseRequestStatus',
});
