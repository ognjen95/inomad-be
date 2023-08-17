import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindCaseByIdQuery } from './find-case-by-id.query';
import { ICaseRepository } from 'src/application/common/interfaces/case/case-repository.interface';
import { Inject } from '@nestjs/common';
import { CASE_REPOSITORY_TOKEN } from 'src/application/common/constants/tokens';

import { Case } from 'src/domain/case/Case';

@QueryHandler(FindCaseByIdQuery)
class FindCaseByIdHandler implements IQueryHandler<FindCaseByIdQuery> {
  constructor(
    @Inject(CASE_REPOSITORY_TOKEN)
    private readonly userRepository: ICaseRepository,
  ) {}

  async execute({ id }: FindCaseByIdQuery): Promise<Case> {
    return await this.userRepository.findOneById(id);
  }
}

export default FindCaseByIdHandler;
