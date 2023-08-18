import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateTimeOffInput {
  @Field()
  name: string;

  @Field(() => Int)
  forYear: number;

  @Field(() => Int)
  totalDays: number;
}
