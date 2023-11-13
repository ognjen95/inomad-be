import { Field, InputType } from '@nestjs/graphql';
import { CreateQuestionInput } from './questions/create-question.input';

@InputType()
export class CreateQuestionGroupInput {
  @Field()
  name: string;

  @Field(() => [CreateQuestionInput])
  questions: CreateQuestionInput[];

  @Field({ nullable: true })
  templateId?: string;
}
