import { Field, InputType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';
import { FilterInput } from './filter.dto';
import { PaginationInput } from './pagination.dto';

@InputType()
export class QueryOptionsInput {
  @IsOptional()
  @Field(() => FilterInput, { nullable: true })
  filters?: FilterInput;

  @IsOptional()
  @Field(() => PaginationInput, { nullable: true })
  pagination?: PaginationInput;
}
