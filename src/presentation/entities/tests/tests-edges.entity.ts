import { Field, Int, ObjectType } from '@nestjs/graphql';
import { TestEntity } from './test.entity';
import { PageInfo } from '../edges.entity';

@ObjectType()
export class TestsEdges {
  @Field()
  cursor: string;

  @Field(() => TestEntity)
  node: TestEntity;
}

@ObjectType()
export class TestsEntityEdgesEntity {
  @Field(() => Int)
  totalCount: number;

  @Field(() => [TestsEdges])
  edges: TestsEdges[];

  @Field(() => PageInfo)
  pageInfo: PageInfo;
}
