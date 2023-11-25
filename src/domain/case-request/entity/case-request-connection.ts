import { Field, Int, ObjectType } from '@nestjs/graphql';

import {
  Connection as RelayConnection,
  Edge as RelayEdge,
  PageInfo as RelayPageInfo,
} from 'graphql-relay';
import { PageInfo } from '../../common/page-info.entity';
import { CaseRequestEntity } from './case-request.entity';

@ObjectType()
class CaseRequestEdges implements RelayEdge<CaseRequestEntity> {
  @Field(() => CaseRequestEntity, { nullable: false })
  node: CaseRequestEntity;

  @Field(() => String, { nullable: false })
  cursor: string;
}

@ObjectType()
export class CaseRequestConnection
  implements RelayConnection<CaseRequestEntity>
{
  @Field(() => [CaseRequestEdges], { nullable: false })
  edges: Array<RelayEdge<CaseRequestEntity>>;

  @Field(() => PageInfo, { nullable: false })
  pageInfo: RelayPageInfo;

  @Field(() => Int, { nullable: false })
  totalCount: number;
}
