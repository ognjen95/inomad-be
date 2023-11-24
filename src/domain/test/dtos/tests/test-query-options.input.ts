import { InputType, PartialType } from '@nestjs/graphql';
import { UpdateTestInput } from './update-test.input';

@InputType()
export class TestQueryOptionsInput extends PartialType(UpdateTestInput) {}
