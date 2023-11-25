import { Field, Int, ObjectType } from '@nestjs/graphql';

import {
  Connection as RelayConnection,
  Edge as RelayEdge,
  PageInfo as RelayPageInfo,
} from 'graphql-relay';
import { QuestionGroupEntity } from './question-group.entity';
import { PageInfo } from '@domain/common/page-info.entity';

@ObjectType()
class QuestionGroupsEdges implements RelayEdge<QuestionGroupEntity> {
  @Field(() => QuestionGroupEntity, { nullable: false })
  node: QuestionGroupEntity;

  @Field(() => String, { nullable: false })
  cursor: string;
}

@ObjectType()
export class QuestionGroupConnection
  implements RelayConnection<QuestionGroupEntity>
{
  @Field(() => [QuestionGroupsEdges], { nullable: false })
  edges: Array<RelayEdge<QuestionGroupEntity>>;

  @Field(() => PageInfo, { nullable: false })
  pageInfo: RelayPageInfo;

  @Field(() => Int, { nullable: false })
  totalCount: number;
}
