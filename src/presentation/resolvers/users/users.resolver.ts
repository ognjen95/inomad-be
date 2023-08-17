import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserConnection, UserEntity } from '../../entities/user/user.entity';
import { UpdateUserInput } from 'src/presentation/dto/user/update-user.input';
import { CreateUserInput } from 'src/presentation/dto/user/create-user.input';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserCommand } from 'src/application/commands/user/create-user/create-user.command';
import { FindAllUsersQuery } from 'src/application/queries/users/find-all/find-all-users.query';
import { FindUserByIdQuery } from 'src/application/queries/users/find-user-by-id/find-user-by-id.query';
import { UpdateUserCommand } from 'src/application/commands/user/update-user/update-user.command';
import { RemoveUserCommand } from 'src/application/commands/user/remove-user/remove-user.command';
import { QueryOptionsInput } from 'src/presentation/dto/common/query-options.dto';
import { MutationReturn } from 'src/presentation/common/entities/mutation-return-type';

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
}
