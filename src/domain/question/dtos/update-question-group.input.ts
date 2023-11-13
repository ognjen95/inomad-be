import { Field, InputType } from '@nestjs/graphql';
import { UpdateQuestionInput } from './questions/update-question.input';

@InputType()
export class UpdateQuestionGroupInput {
  @Field()
  id: string;

  @Field(() => [UpdateQuestionInput], { nullable: 'itemsAndList' })
  questions?: UpdateQuestionInput[];
}
