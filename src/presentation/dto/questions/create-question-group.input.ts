import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateQuestionGroupInput {
  @Field()
  name: string;
}
