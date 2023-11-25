import { Field, Int, ObjectType } from '@nestjs/graphql';

import {
  Connection as RelayConnection,
  Edge as RelayEdge,
  PageInfo as RelayPageInfo,
} from 'graphql-relay';
import { PageInfo } from '@domain/common/page-info.entity';
import { TestEntity } from './test.entity';

@ObjectType()
class TemplateEdges implements RelayEdge<TestEntity> {
  @Field(() => TestEntity, { nullable: false })
  node: TestEntity;

  @Field(() => String, { nullable: false })
  cursor: string;
}

@ObjectType()
export class TemplateConnection implements RelayConnection<TestEntity> {
  @Field(() => [TemplateEdges], { nullable: false })
  edges: Array<RelayEdge<TestEntity>>;

  @Field(() => PageInfo, { nullable: false })
  pageInfo: RelayPageInfo;

  @Field(() => Int, { nullable: false })
  totalCount: number;
}
