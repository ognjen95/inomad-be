import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindTestByIdQuery } from './find-one-by-id.query';
import { ITestRepository } from '@application/common/interfaces/test/test-repository.interface';
import { TEST_REPOSITORY_TOKEN } from '@application/common/constants/tokens';
import { Inject } from '@nestjs/common';

@QueryHandler(FindTestByIdQuery)
class FindTestByIdQueryHandler implements IQueryHandler<FindTestByIdQuery> {
  constructor(
    @Inject(TEST_REPOSITORY_TOKEN)
    private readonly testRepository: ITestRepository,
  ) {}

  async execute({ id }: FindTestByIdQuery): Promise<any> {
    return await this.testRepository.findOneById(id);
  }
}

export default FindTestByIdQueryHandler;
