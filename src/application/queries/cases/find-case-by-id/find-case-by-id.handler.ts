import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindCaseByIdQuery } from './find-case-by-id.query';
import { ICaseRepository } from '@application/common/interfaces/case/case-request-repository.interface';
import { Inject } from '@nestjs/common';
import { CASE_REPOSITORY_TOKEN } from '@application/common/constants/tokens';

import { Case } from '@domain/case/case';

@QueryHandler(FindCaseByIdQuery)
class FindCaseByIdHandler implements IQueryHandler<FindCaseByIdQuery> {
  constructor(
    @Inject(CASE_REPOSITORY_TOKEN)
    private readonly caseRepository: ICaseRepository,
  ) {}

  async execute({ id }: FindCaseByIdQuery): Promise<Case> {
    return await this.caseRepository.findOneById(id);
  }
}

export default FindCaseByIdHandler;
