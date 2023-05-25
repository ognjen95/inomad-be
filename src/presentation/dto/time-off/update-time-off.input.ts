import { CreateTimeOffInput } from './create-time-off.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTimeOffInput extends PartialType(CreateTimeOffInput) {
  @Field(() => Int)
  id: number;
}
