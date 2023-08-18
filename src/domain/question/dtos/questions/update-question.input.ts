import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateQuestionInput {
  @Field()
  id: string;

  @Field(() => [String])
  answeredIds: string[];
}
