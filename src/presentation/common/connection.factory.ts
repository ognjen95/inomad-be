import { Type } from '@nestjs/common/interfaces/type.interface';
import { Field, ObjectType } from '@nestjs/graphql';
import {
  Connection as RelayConnection,
  Edge as RelayEdge,
  PageInfo as RelayPageInfo,
} from 'graphql-relay';

export function Connection<GraphQLObject>(GenericClass?: Type<GraphQLObject>) {
  @ObjectType({ isAbstract: true })
  class PageInfoRelay implements RelayPageInfo {
    @Field(() => String, { nullable: true })
    startCursor: string;

    @Field(() => String, { nullable: true })
    endCursor: string;

    @Field(() => Boolean, { nullable: false })
    hasPreviousPage: boolean;

    @Field(() => Boolean, { nullable: false })
    hasNextPage: boolean;
  }

  @ObjectType({ isAbstract: true })
  abstract class Edges<GraphQLObject> implements RelayEdge<GraphQLObject> {
    @Field(() => GenericClass, { nullable: false })
    node: GraphQLObject;

    @Field(() => String, { nullable: false })
    cursor: string;
  }

  @ObjectType({ isAbstract: true })
  abstract class IConnection implements RelayConnection<GraphQLObject> {
    @Field(() => [Edges], { nullable: false })
    edges: Array<RelayEdge<GraphQLObject>>;

    @Field(() => PageInfoRelay, { nullable: false })
    pageInfo: PageInfoRelay;
  }

  return IConnection;
}
