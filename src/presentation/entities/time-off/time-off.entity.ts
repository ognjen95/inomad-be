import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Connection as RelayConnection,
  Edge as RelayEdge,
  PageInfo as RelayPageInfo,
} from 'graphql-relay';
import { PageInfo } from 'src/domain/common/page-info.entity';
import { User } from 'src/domain/user/user';
import { UserEntity } from 'src/domain/user/user.entity';

@ObjectType()
export class TimeOffEntity {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field(() => Int)
  forYear: number;

  @Field(() => Int)
  totalDays: number;

  @Field(() => Int)
  usedDays: number;

  @Field(() => Int)
  pendingDays: number;

  @Field(() => Int)
  remainingDays: number;

  @Field({ nullable: true })
  employeeId: string;

  @Field(() => UserEntity, { nullable: true })
  employee: User;
}

@ObjectType()
class TimeOffEdges implements RelayEdge<TimeOffEntity> {
  @Field(() => TimeOffEntity, { nullable: false })
  node: TimeOffEntity;

  @Field(() => String, { nullable: false })
  cursor: string;
}

@ObjectType()
export class TimeOffConnection<TimeOffEntity>
  implements RelayConnection<TimeOffEntity>
{
  @Field(() => [TimeOffEdges], { nullable: false })
  edges: Array<RelayEdge<TimeOffEntity>>;

  @Field(() => PageInfo, { nullable: false })
  pageInfo: RelayPageInfo;

  @Field(() => Int, { nullable: false })
  totalCount: number;
}
