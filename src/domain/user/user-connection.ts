import { Field } from '@nestjs/graphql/dist/decorators/field.decorator';
import { ObjectType } from '@nestjs/graphql/dist/decorators/object-type.decorator';
import { User } from './user';
import {
  Connection as RelayConnection,
  Edge as RelayEdge,
  PageInfo as RelayPageInfo,
} from 'graphql-relay';
import { Int, registerEnumType } from '@nestjs/graphql';
import { EmploymentStatus, UserRoles } from './enums';
import { PageInfo } from '@domain/common/page-info.entity';
import { UserEntity } from './user.entity';

@ObjectType()
class UserEdges implements RelayEdge<UserEntity> {
  @Field(() => UserEntity, { nullable: false })
  node: User;

  @Field(() => String, { nullable: false })
  cursor: string;
}

@ObjectType()
export class UserConnection implements RelayConnection<UserEntity> {
  @Field(() => [UserEdges], { nullable: false })
  edges: Array<RelayEdge<User>>;

  @Field(() => PageInfo, { nullable: false })
  pageInfo: RelayPageInfo;

  @Field(() => Int, { nullable: false })
  totalCount: number;
}

registerEnumType(EmploymentStatus, {
  name: 'EmploymentStatus',
});

registerEnumType(UserRoles, {
  name: 'UserRoles',
});
