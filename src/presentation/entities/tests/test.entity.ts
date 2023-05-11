import { ObjectType, Field, Int } from '@nestjs/graphql';
import { QuestionEntity } from '../questions/question.entity';

@ObjectType()
export class TestEntity {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field(() => [QuestionEntity])
  questions: QuestionEntity[];

  @Field(() => Int)
  percentageToPass: number;

  @Field(() => Int, { nullable: true })
  percentageScored?: number;

  @Field(() => Int, { nullable: true })
  timeLimit?: number;

  @Field(() => Date, { nullable: true })
  startedAt?: Date;

  @Field(() => Date, { nullable: true })
  endsAt?: Date;

  @Field(() => Date, { nullable: true })
  createdAt: Date;

  @Field({ nullable: true })
  employeeId?: string;
}
