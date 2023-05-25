import { Field, Int, ObjectType } from '@nestjs/graphql';
import { PageInfo } from '../edges.entity';
import { TimeOffEntity } from './time-off.entity';

@ObjectType()
export class TimeOffEdges {
  @Field()
  cursor: string;

  @Field(() => TimeOffEntity)
  node: TimeOffEntity;
}

@ObjectType()
export class TimeOffEntityEdgesEntity {
  @Field(() => Int)
  totalCount: number;

  @Field(() => [TimeOffEdges])
  edges: TimeOffEdges[];

  @Field(() => PageInfo)
  pageInfo: PageInfo;
}
