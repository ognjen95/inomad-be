import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from './user.entity';

@ObjectType()
export class Edges {
  @Field()
  cursor: string;
  @Field(() => User)
  node: User;
}

@ObjectType()
export class PageInfo {
  @Field({ nullable: true })
  hasNextPage: boolean;

  @Field({ nullable: true })
  hasPreviousPage: boolean;

  @Field({ nullable: true })
  startCursor: string;

  @Field({ nullable: true })
  endCursor: string;
}

@ObjectType()
export class UserEdgesEntity {
  @Field(() => Int)
  totalCount: number;

  @Field(() => [Edges])
  edges: Edges[];

  @Field(() => PageInfo)
  pageInfo: PageInfo;
}
