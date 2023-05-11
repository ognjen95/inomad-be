import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateTestInput {
  @Field()
  name: string;

  @Field(() => [String])
  questionIds: string[];

  @Field(() => Int)
  percentageToPass: number;

  @Field(() => Int, { nullable: true })
  percentageScored?: number;

  @Field(() => Int, { nullable: true })
  timeLimit?: number;

  // @Field()
  // startedAt?: Date;

  @Field({ nullable: true })
  endsAt: Date;

  @Field({ nullable: true })
  employeeId?: string;
}
