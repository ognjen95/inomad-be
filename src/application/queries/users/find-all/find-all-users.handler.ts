import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindAllUsersQuery } from './find-all-users.query';
import { User } from '@domain/user/entity/user';
import { Inject } from '@nestjs/common';
import { USER_REPOSITORY_TOKEN } from '@application/common/constants/tokens';
import { IUserRepository } from '@application/common/interfaces/user/user-repository.interface';
import { Connection, connectionFromArray } from 'graphql-relay';

@QueryHandler(FindAllUsersQuery)
class FindAllUsersHandler implements IQueryHandler<FindAllUsersQuery> {
  constructor(
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute({
    queryOptions,
  }: FindAllUsersQuery): Promise<Connection<User>> {
    const users = await this.userRepository.findAll(queryOptions);

    return connectionFromArray(users, {});
  }
}

export default FindAllUsersHandler;
