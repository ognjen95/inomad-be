import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindUserByIdQuery } from './find-user-by-id.query';
import { USER_REPOSITORY_TOKEN } from '@application/common/constants/tokens';
import { Inject } from '@nestjs/common';
import { IUserRepository } from '@application/common/interfaces/user/user-repository.interface';

@QueryHandler(FindUserByIdQuery)
class FindUserByIdQueryHandler implements IQueryHandler<FindUserByIdQuery> {
  constructor(
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute({ id }: FindUserByIdQuery): Promise<any> {
    return await this.userRepository.findOneById(id);
  }
}

export default FindUserByIdQueryHandler;
