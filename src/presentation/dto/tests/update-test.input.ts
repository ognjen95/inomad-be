import { CreateTestInput } from './create-test.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTestInput extends PartialType(CreateTestInput) {
  @Field()
  id: string;
}
