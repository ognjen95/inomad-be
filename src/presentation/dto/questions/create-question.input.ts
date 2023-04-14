import { InputType, Field } from '@nestjs/graphql';

@InputType()
class AnswerInput {
  @Field()
  id: string;

  @Field()
  text: string;

  @Field()
  isCorrect: boolean;

  @Field()
  answered: boolean;
}

@InputType()
export class CreateQuestionInput {
  @Field()
  text: string;

  @Field()
  points: number;

  @Field(() => [AnswerInput], { nullable: true })
  answers?: AnswerInput[];

  @Field()
  questionGroup: string;
}
