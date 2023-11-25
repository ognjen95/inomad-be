import { Field, Int, ObjectType } from '@nestjs/graphql';

import {
  Connection as RelayConnection,
  Edge as RelayEdge,
  PageInfo as RelayPageInfo,
} from 'graphql-relay';
import { PageInfo } from '../../common/page-info.entity';
import { ProviderCompanyEntity } from './provider-company.entity';

@ObjectType()
class ProviderCompanyEdges implements RelayEdge<ProviderCompanyEntity> {
  @Field(() => ProviderCompanyEntity, { nullable: false })
  node: ProviderCompanyEntity;

  @Field(() => String, { nullable: false })
  cursor: string;
}

@ObjectType()
export class ProviderCompanyConnection
  implements RelayConnection<ProviderCompanyEntity>
{
  @Field(() => [ProviderCompanyEdges], { nullable: false })
  edges: Array<RelayEdge<ProviderCompanyEntity>>;

  @Field(() => PageInfo, { nullable: false })
  pageInfo: RelayPageInfo;

  @Field(() => Int, { nullable: false })
  totalCount: number;
}
