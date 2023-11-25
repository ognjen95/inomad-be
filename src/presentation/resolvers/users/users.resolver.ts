import {
  Resolver,
  Query,
  Mutation,
  ResolveField,
  Parent,
  Args,
} from '@nestjs/graphql';

import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserCommand } from '@application/commands/user/create-user/create-user.command';
import { FindAllUsersQuery } from '@application/queries/users/find-all/find-all-users.query';
import { FindUserByIdQuery } from '@application/queries/users/find-user-by-id/find-user-by-id.query';
import { UpdateUserCommand } from '@application/commands/user/update-user/update-user.command';
import { RemoveUserCommand } from '@application/commands/user/remove-user/remove-user.command';
import { MutationReturn } from '@application/common/return-dtos/mutation-return-dt0';
import { FindAllCasesQuery } from '@application/queries/cases/find-all-cases/find-all-cases.query';

import { FindCaseByIdQuery } from '@application/queries/cases/find-case-by-id/find-case-by-id.query';
import { CreateUserInput } from '@domain/user/dtos/create-user.input';
import { UpdateUserInput } from '@domain/user/dtos/update-user.input';
import { UserQueryOptionsInput } from '@domain/user/dtos/query-options.input';
import { UserConnection } from '@domain/user/entity/user-connection';
import { CaseConnection } from '@domain/case-connection';
import { CaseEntity } from '@domain/case.entity';
import { UserEntity } from '@domain/user/entity/user.entity';
import { User } from '@domain/user/entity/user';
import { IsPublic } from '@presentation/decorators/is-public';
import { CurrentUser } from '@presentation/decorators/current-user';
import { CurrentUserInfo } from '../auth/types';
import { CreateCustomerCommand } from '@application/commands/user/create-customer/create-user.command';

@Resolver(() => UserEntity)
export class UsersResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Mutation(() => MutationReturn)
  async createUser(
    @Args('args') args: CreateUserInput,
    @CurrentUser() currentUser: CurrentUserInfo,
  ) {
    return await this.commandBus.execute<CreateUserCommand, UserEntity>(
      new CreateUserCommand(args, currentUser),
    );
  }

  @IsPublic()
  @Mutation(() => MutationReturn, { name: 'registerCustomer' })
  async createCustomer(@Args('args') args: CreateUserInput) {
    return await this.commandBus.execute<CreateCustomerCommand, UserEntity>(
      new CreateCustomerCommand(args),
    );
  }

  @Mutation(() => UserEntity)
  async updateUser(@Args('args') args: UpdateUserInput) {
    return await this.commandBus.execute<UpdateUserCommand, UserEntity>(
      new UpdateUserCommand(args),
    );
  }

  @Mutation(() => UserEntity)
  async removeUser(@Args('id') id: string) {
    return await this.commandBus.execute<RemoveUserCommand, UserEntity>(
      new RemoveUserCommand(id),
    );
  }

  @Query(() => UserConnection, { name: 'users' })
  async findAll(
    @Args('args', { nullable: true })
    args: UserQueryOptionsInput,
  ) {
    // console.log({ user });
    return await this.queryBus.execute<FindAllUsersQuery, UserEntity>(
      new FindAllUsersQuery(args),
    );
  }

  @Query(() => UserEntity, { name: 'userById' })
  async findOneById(@Args('id') id: string) {
    return await this.queryBus.execute<FindUserByIdQuery, UserEntity>(
      new FindUserByIdQuery(id),
    );
  }

  @ResolveField(() => CaseConnection, { name: 'cases' })
  findAllUserCases(
    @Parent() user: User,
    @Args('args', { nullable: true }) args: UserQueryOptionsInput,
  ) {
    return this.queryBus.execute<FindAllCasesQuery, CaseEntity>(
      new FindAllCasesQuery({
        userId: user.getId,
        where: args?.where,
      }),
    );
  }

  @ResolveField(() => CaseEntity, { name: 'case' })
  findUserCaseById(@Args('id') id: string) {
    return this.queryBus.execute<FindCaseByIdQuery, CaseEntity>(
      new FindCaseByIdQuery(id),
    );
  }
}
