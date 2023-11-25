import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';

import {
  Connection as RelayConnection,
  Edge as RelayEdge,
  PageInfo as RelayPageInfo,
} from 'graphql-relay';
import { PageInfo } from '../../common/page-info.entity';
import { CaseStatus } from './enums';
import { CaseEntity } from './case.entity';

@ObjectType()
class CaseEdges implements RelayEdge<CaseEntity> {
  @Field(() => CaseEntity, { nullable: false })
  node: CaseEntity;

  @Field(() => String, { nullable: false })
  cursor: string;
}

@ObjectType()
export class CaseConnection implements RelayConnection<CaseEntity> {
  @Field(() => [CaseEdges], { nullable: false })
  edges: Array<RelayEdge<CaseEntity>>;

  @Field(() => PageInfo, { nullable: false })
  pageInfo: RelayPageInfo;

  @Field(() => Int, { nullable: false })
  totalCount: number;
}

registerEnumType(CaseStatus, {
  name: 'CaseStatus',
});
