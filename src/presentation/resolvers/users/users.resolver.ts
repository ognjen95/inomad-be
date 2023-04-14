import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { User as UserEntity } from '../../entities/user.entity';
import { UpdateUserInput } from 'src/presentation/dto/user/update-user.input';
import { CreateUserInput } from 'src/presentation/dto/user/create-user.input';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserCommand } from 'src/application/commands/user/create-user/create-user.command';
import { FindAllUsersQuery } from 'src/application/queries/users/find-all/find-all-users.query';
import { FindUserByIdQuery } from 'src/application/queries/users/find-user-by-id/find-user-by-id.query';
import { UpdateUserCommand } from 'src/application/commands/user/update-user/update-user.command';
import { RemoveUserCommand } from 'src/application/commands/user/remove-user/remove-user.command';
import { UserEdgesEntity } from 'src/presentation/entities/edges.entity';
import { QueryOptionsInput } from 'src/presentation/dto/common/query-options.dto';

@Resolver(() => UserEntity)
export class UsersResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Mutation(() => UserEntity)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return await this.commandBus.execute<CreateUserCommand, UserEntity>(
      new CreateUserCommand(createUserInput),
    );
  }

  @Query(() => UserEdgesEntity, { name: 'findAllUsers' })
  async findAll(
    @Args('QueryOptionsInput', { nullable: true })
    queryOptionsInput?: QueryOptionsInput,
  ) {
    return await this.queryBus.execute<FindAllUsersQuery, UserEntity>(
      new FindAllUsersQuery(queryOptionsInput),
    );
  }

  @Query(() => UserEntity, { name: 'findUserById' })
  async findOneById(@Args('id') id: string) {
    return await this.queryBus.execute<FindUserByIdQuery, UserEntity>(
      new FindUserByIdQuery(id),
    );
  }

  @Mutation(() => UserEntity)
  async updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return await this.commandBus.execute<UpdateUserCommand, UserEntity>(
      new UpdateUserCommand(updateUserInput),
    );
  }

  @Mutation(() => UserEntity)
  async removeUser(@Args('id') id: string) {
    return await this.commandBus.execute<RemoveUserCommand, UserEntity>(
      new RemoveUserCommand(id),
    );
  }
}
