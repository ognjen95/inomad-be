import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindAllCaseRequestsQuery } from './find-all-case-requests.query';
import { Inject } from '@nestjs/common';
import { CASE_REQUEST_REPOSITORY_TOKEN } from 'src/application/common/constants/tokens';
import { connectionFromArray } from 'graphql-relay/connection/arrayConnection';
import { Connection } from 'graphql-relay';
import { ICaseRequestRepository } from 'src/application/common/interfaces/case/case-repository.interface';
import { CaseRequest } from 'src/domain/case-request/case-request';

@QueryHandler(FindAllCaseRequestsQuery)
class FindAllCaseRequestsHandler
  implements IQueryHandler<FindAllCaseRequestsQuery>
{
  constructor(
    @Inject(CASE_REQUEST_REPOSITORY_TOKEN)
    private readonly caseRequestRepository: ICaseRequestRepository,
  ) {}

  async execute({
    options,
  }: FindAllCaseRequestsQuery): Promise<Connection<CaseRequest>> {
    const cases = await this.caseRequestRepository.findAll(options);

    return connectionFromArray(cases, {});
  }
}

export default FindAllCaseRequestsHandler;
