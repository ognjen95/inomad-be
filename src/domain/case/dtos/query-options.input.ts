import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ApplicantsIdsInput {
  @Field()
  hasSome?: string;
}

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
  userId?: string;

  @Field(() => CaseWhereInput, { nullable: true })
  where?: CaseWhereInput;
}
