import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateTestInput {
  @Field()
  name: string;

  @Field({ nullable: true })
  caseId?: string;

  @Field(() => [String])
  questionGroupIds: string[];

  @Field(() => Int, { nullable: true })
  percentageToPass?: number;

  @Field(() => Int, { nullable: true })
  percentageScored?: number;

  @Field(() => Int, { nullable: true })
  timeLimit?: number;

  @Field({ nullable: true })
  endsAt?: Date;

  @Field({ nullable: true })
  employeeId?: string;

  @Field({ nullable: true })
  providerCompanyId?: string;
}
