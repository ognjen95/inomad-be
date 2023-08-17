import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindAllCasesQuery } from './find-all-casses.query';
import { ICaseRepository } from 'src/application/common/interfaces/case/case-repository.interface';
import { Inject } from '@nestjs/common';
import { CASE_REPOSITORY_TOKEN } from 'src/application/common/constants/tokens';
import { connectionFromArray } from 'graphql-relay/connection/arrayConnection';
import { Connection } from 'graphql-relay';
import { Case } from 'src/domain/case/Case';

@QueryHandler(FindAllCasesQuery)
class FindAllCasesHandler implements IQueryHandler<FindAllCasesQuery> {
  constructor(
    @Inject(CASE_REPOSITORY_TOKEN)
    private readonly userRepository: ICaseRepository,
  ) {}

  async execute({ options }: FindAllCasesQuery): Promise<Connection<Case>> {
    const cases = await this.userRepository.findAll(options);

    return connectionFromArray(cases, {});
  }
}

export default FindAllCasesHandler;
