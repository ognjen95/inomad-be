import { ObjectType, Field } from '@nestjs/graphql';

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

  @Field(() => [AnswerEntity], { nullable: true })
  answers?: AnswerEntity[];

  @Field()
  questionGroup: string;
}
