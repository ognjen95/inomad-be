import { Field, InputType } from '@nestjs/graphql';
import { ApplicantsIdsInput } from 'src/domain/user/dtos/query-options.input';

@InputType()
export class CaseWhereInput {
  @Field(() => ApplicantsIdsInput)
  applicationId?: ApplicantsIdsInput;
}

@InputType()
export class CaseQueryOptionsInput {
  @Field({ nullable: true })
  providerCompanyId?: string;

  @Field({ nullable: true })
  isAvailable?: boolean;

  @Field({ nullable: true })
  caseId?: string;

  @Field({ nullable: true })
  userId?: string;

  @Field(() => CaseWhereInput, { nullable: true })
  where?: CaseWhereInput;
}
