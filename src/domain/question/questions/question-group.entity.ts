import { Field, ObjectType } from '@nestjs/graphql';
import { QuestionEntity } from './question.entity';
import { Question } from '../question';

@ObjectType()
export class QuestionGroupEntity {
  @Field()
  protected id: string;

  @Field()
  protected name: string;

  @Field({ nullable: true })
  protected testId?: string;

  @Field(() => [QuestionEntity], { nullable: true })
  protected questions?: Question[];

  @Field(() => [String], { nullable: true })
  protected questionIds?: string[];

  @Field({ nullable: true })
  protected providerCompanyId?: string;

  @Field({ nullable: true, defaultValue: true })
  protected isExample?: boolean;
}
