import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindAllUsersQuery } from './find-all-users.query';
import { User } from 'src/domain/user/User';
import { Inject } from '@nestjs/common';
import { USER_REPOSITORY_TOKEN } from 'src/application/common/constants/tokens';
import { IUserRepository } from 'src/application/common/interfaces/user/user-repository.interface';
import { EdgesResponse } from 'src/application/common/types/query-return.type';

@QueryHandler(FindAllUsersQuery)
class FindAllUsersHandler implements IQueryHandler<FindAllUsersQuery> {
  constructor(
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute({
    queryOptions,
  }: FindAllUsersQuery): Promise<EdgesResponse<User>> {
    return await this.userRepository.findAll(queryOptions);
  }
}

export default FindAllUsersHandler;
