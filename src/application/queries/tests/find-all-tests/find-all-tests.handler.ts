import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindAllTestsQuery } from './find-all-tests.query';
import { ITestRepository } from 'src/application/common/interfaces/test/test-repository.interface';
import { Test } from 'src/domain/test/Test';
import { Inject } from '@nestjs/common';
import { TEST_REPOSITORY_TOKEN } from 'src/application/common/constants/tokens';
import { Connection, connectionFromArray } from 'graphql-relay';

@QueryHandler(FindAllTestsQuery)
class FindAllTestsHandler implements IQueryHandler<FindAllTestsQuery> {
  constructor(
    @Inject(TEST_REPOSITORY_TOKEN)
    private readonly testRepository: ITestRepository,
  ) {}

  async execute({
    queryOptions,
  }: FindAllTestsQuery): Promise<Connection<Test>> {
    const templates = await this.testRepository.findAll(queryOptions);

    return connectionFromArray(templates, {});
  }
}

export default FindAllTestsHandler;
