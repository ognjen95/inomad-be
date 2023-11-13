import { ObjectType, Field, Int } from '@nestjs/graphql';
import { QuestionGroupEntity } from '../question/questions/question-group.entity';
import { QuestionGroup } from '../question/question-group';

@ObjectType()
export class TestEntity {
  @Field()
  protected id: string;

  @Field()
  protected name: string;

  @Field(() => [QuestionGroupEntity], { nullable: true })
  protected questionGroups?: QuestionGroup[];

  @Field(() => [String], { nullable: true })
  protected questionGroupIds?: string[];

  @Field(() => Int, { nullable: true })
  protected percentageToPass?: number;

  @Field(() => Int, { nullable: true })
  protected percentageScored?: number;

  @Field(() => Int, { nullable: true })
  protected timeLimit?: number;

  @Field(() => Date, { nullable: true })
  protected startedAt?: Date;

  @Field(() => Date, { nullable: true })
  protected endsAt?: Date;

  @Field(() => Date, { nullable: true })
  protected createdAt: Date;

  @Field({ nullable: true })
  protected employeeId?: string;

  @Field({ nullable: true })
  protected caseId?: string;

  @Field({ nullable: true })
  protected providerCompanyId?: string;
}
