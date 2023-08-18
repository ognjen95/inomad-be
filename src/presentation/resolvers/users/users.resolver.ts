import {
  Resolver,
  Query,
  Mutation,
  ResolveField,
  Parent,
  Args,
} from '@nestjs/graphql';

import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserCommand } from 'src/application/commands/user/create-user/create-user.command';
import { FindAllUsersQuery } from 'src/application/queries/users/find-all/find-all-users.query';
import { FindUserByIdQuery } from 'src/application/queries/users/find-user-by-id/find-user-by-id.query';
import { UpdateUserCommand } from 'src/application/commands/user/update-user/update-user.command';
import { RemoveUserCommand } from 'src/application/commands/user/remove-user/remove-user.command';
import { QueryOptionsInput } from 'src/presentation/dto/common/query-options.dto';
import { MutationReturn } from 'src/presentation/common/entities/mutation-return-type';
import { FindAllCasesQuery } from 'src/application/queries/cases/find-all-cases/find-all-casses.query';

import { FindCaseByIdQuery } from 'src/application/queries/cases/find-case-by-id/find-case-by-id.query';
import { CreateUserInput } from 'src/domain/user/dtos/create-user.input';
import { UpdateUserInput } from 'src/domain/user/dtos/update-user.input';
import { UserQueryOptionsInput } from 'src/domain/user/dtos/query-options.input';
import { UserConnection } from 'src/domain/user/user-connection';
import { CaseConnection } from 'src/domain/case/case-connection';
import { CaseEntity } from 'src/domain/case/case.entity';
import { UserEntity } from 'src/domain/user/user.entity';
import { User } from 'src/domain/user/user';

@Resolver(() => UserEntity)
export class UsersResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Mutation(() => MutationReturn)
  async createUser(@Args('args') args: CreateUserInput) {
    return await this.commandBus.execute<CreateUserCommand, UserEntity>(
      new CreateUserCommand(args),
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
    args: QueryOptionsInput,
  ) {
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
        where: args.where,
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
