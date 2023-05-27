import { Field, Int, ObjectType } from '@nestjs/graphql';
import { PageInfo } from '../edges.entity';
import { TimeOffRequestEntity } from './time-off-request';

@ObjectType()
export class TimeOffRequestEdges {
  @Field()
  cursor: string;

  @Field(() => TimeOffRequestEntity)
  node: TimeOffRequestEntity;
}

@ObjectType()
export class TimeOffRequestEdgesEntity {
  @Field(() => Int)
  totalCount: number;

  @Field(() => [TimeOffRequestEdges])
  edges: TimeOffRequestEdges[];

  @Field(() => PageInfo)
  pageInfo: PageInfo;
}
