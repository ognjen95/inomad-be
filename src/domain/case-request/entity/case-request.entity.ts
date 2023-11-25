import { ObjectType, Field, registerEnumType, Float } from '@nestjs/graphql';
import { CaseRequestStatus } from '../enums';
import { CaseEntity } from '../../case/entity/case.entity';
import { Case } from '../../case/entity/case';

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

  @Field(() => Boolean, { nullable: true, defaultValue: false })
  isProposal?: boolean;

  @Field(() => CaseRequestStatus, { defaultValue: CaseRequestStatus.PENDING })
  status: CaseRequestStatus;

  @Field(() => Date, { defaultValue: new Date() })
  createdAt: Date;

  @Field(() => Date)
  deadline: Date;

  @Field(() => Date, { defaultValue: new Date() })
  updatedAt: Date;

  @Field(() => CaseEntity, { nullable: true })
  case?: Case;

  @Field(() => Float, { nullable: true })
  totalCost?: number;
}

registerEnumType(CaseRequestStatus, {
  name: 'CaseRequestStatus',
});
