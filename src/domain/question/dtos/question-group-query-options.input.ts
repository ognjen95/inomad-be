import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class QuestionGroupIdInput {
  @Field({ nullable: true })
  equals?: string;

  @Field(() => [String], { nullable: true })
  in?: string[];
}

@InputType()
export class QuestionGroupWhere {
  @Field({ nullable: true })
  providerCompanyId?: string;

  @Field({ nullable: true, defaultValue: true })
  isExample?: boolean = true;

  @Field(() => QuestionGroupIdInput, { nullable: true })
  id?: QuestionGroupIdInput;
}

@InputType()
export class QuestionGroupOptionsInput {
  @Field(() => QuestionGroupWhere, { nullable: true })
  where?: QuestionGroupWhere;
}
