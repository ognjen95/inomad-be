import { ObjectType, Field } from '@nestjs/graphql';
import { QuestionGroupEntity } from './question-group.entity';

@ObjectType()
class AnswerEntity {
  @Field()
  id: string;

  @Field()
  text: string;

  @Field()
  isCorrect: boolean;

  @Field()
  answered: boolean;
}

@ObjectType()
export class QuestionEntity {
  @Field()
  id: string;

  @Field()
  text: string;

  @Field()
  points: number;

  @Field({ nullable: true })
  testId?: string;

  @Field(() => [AnswerEntity], { nullable: true })
  answers?: AnswerEntity[];

  @Field(() => QuestionGroupEntity, { nullable: true })
  questionGroup?: QuestionGroupEntity;

  @Field({ nullable: true })
  answerType?: string;
}
