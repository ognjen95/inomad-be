import { CreateCompensationInput } from './create-compensation.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateCompensationInput extends PartialType(
  CreateCompensationInput,
) {
  @Field()
  id: string;
}
