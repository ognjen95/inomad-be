import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindAllCasesQuery } from './find-all-cases.query';
import { ICaseRepository } from '@application/common/interfaces/case/case-request-repository.interface';
import { Inject } from '@nestjs/common';
import { CASE_REPOSITORY_TOKEN } from '@application/common/constants/tokens';
import { connectionFromArray } from 'graphql-relay/connection/arrayConnection';
import { Connection } from 'graphql-relay';
import { Case } from '@domain/case/case';

@QueryHandler(FindAllCasesQuery)
class FindAllCasesHandler implements IQueryHandler<FindAllCasesQuery> {
  constructor(
    @Inject(CASE_REPOSITORY_TOKEN)
    private readonly casesRepository: ICaseRepository,
  ) {}

  async execute({ options }: FindAllCasesQuery): Promise<Connection<Case>> {
    const cases = await this.casesRepository.findAll(options);

    return connectionFromArray(cases, {});
  }
}

export default FindAllCasesHandler;
