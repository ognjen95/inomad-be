import { ObjectType, Field, registerEnumType, Int } from '@nestjs/graphql';
import { CaseStatus } from 'src/domain/case/enums';
import {
  Connection as RelayConnection,
  Edge as RelayEdge,
  PageInfo as RelayPageInfo,
} from 'graphql-relay';
import { PageInfo } from 'src/presentation/common/entities/page-info.entity';

@ObjectType()
export class Case {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field({ nullable: true, defaultValue: false })
  isPrivate?: boolean;

  @Field(() => [String], { nullable: true, defaultValue: [] })
  employeesIds: string[];

  @Field(() => [String], { nullable: true, defaultValue: [] })
  providersIds: Array<string>;

  @Field(() => [String])
  applicantsIds: string[];

  @Field(() => CaseStatus)
  status: CaseStatus;

  @Field(() => String, { nullable: true })
  providerCompanyId: string;

  @Field(() => String, { nullable: true })
  employerCompanyId: string;
}

@ObjectType()
class CaseEdges implements RelayEdge<Case> {
  @Field(() => Case, { nullable: false })
  node: Case;

  @Field(() => String, { nullable: false })
  cursor: string;
}

@ObjectType()
export class CaseConnection implements RelayConnection<Case> {
  @Field(() => [CaseEdges], { nullable: false })
  edges: Array<RelayEdge<Case>>;

  @Field(() => PageInfo, { nullable: false })
  pageInfo: RelayPageInfo;

  @Field(() => Int, { nullable: false })
  totalCount: number;
}

registerEnumType(CaseStatus, {
  name: 'CaseStatus',
});
