import { Field, ObjectType } from '@nestjs/graphql';
import { PageInfo as RelayPageInfo } from 'graphql-relay';

@ObjectType()
export class PageInfo implements RelayPageInfo {
  @Field(() => String, { nullable: true })
  startCursor: string;

  @Field(() => String, { nullable: true })
  endCursor: string;

  @Field(() => Boolean, { nullable: false })
  hasPreviousPage: boolean;

  @Field(() => Boolean, { nullable: false })
  hasNextPage: boolean;
}
