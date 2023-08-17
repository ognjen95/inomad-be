import { ObjectType, Field, Int, registerEnumType } from '@nestjs/graphql';
import {
  Connection as RelayConnection,
  Edge as RelayEdge,
  PageInfo as RelayPageInfo,
} from 'graphql-relay';
import { EmploymentStatus, UserRoles } from 'src/domain/user/enums';
import { PageInfo } from 'src/presentation/common/entities/page-info.entity';

@ObjectType()
export class UserEntity {
  @Field()
  id: string;

  @Field()
  firstName: string;

  @Field({ nullable: true })
  middleName: string;

  @Field()
  lastName: string;

  @Field(() => Date, { nullable: true })
  birthday: Date;

  @Field()
  email: string;

  @Field(() => UserRoles)
  userRole: UserRoles;

  @Field(() => EmploymentStatus)
  employmentStatus: EmploymentStatus;

  @Field(() => Date, { nullable: true })
  createdAt: Date;

  @Field(() => [UserEntity], { nullable: true, defaultValue: [] })
  family: UserEntity;
}

@ObjectType()
class UserEdges implements RelayEdge<UserEntity> {
  @Field(() => UserEntity, { nullable: false })
  node: UserEntity;

  @Field(() => String, { nullable: false })
  cursor: string;
}

@ObjectType()
export class UserConnection implements RelayConnection<UserEntity> {
  @Field(() => [UserEdges], { nullable: false })
  edges: Array<RelayEdge<UserEntity>>;

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
