import { Field, Int, ObjectType } from '@nestjs/graphql';

import {
  Connection as RelayConnection,
  Edge as RelayEdge,
  PageInfo as RelayPageInfo,
} from 'graphql-relay';
import { PageInfo } from '../common/page-info.entity';
import { TaskEntity } from './task.entity';

@ObjectType()
class TaskEdges implements RelayEdge<TaskEntity> {
  @Field(() => TaskEntity, { nullable: false })
  node: TaskEntity;

  @Field(() => String, { nullable: false })
  cursor: string;
}

@ObjectType()
export class TaskConnection implements RelayConnection<TaskEntity> {
  @Field(() => [TaskEdges], { nullable: false })
  edges: Array<RelayEdge<TaskEntity>>;

  @Field(() => PageInfo, { nullable: false })
  pageInfo: RelayPageInfo;

  @Field(() => Int, { nullable: false })
  totalCount: number;
}
