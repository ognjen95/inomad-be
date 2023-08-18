import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindAllTimeOffsQuery } from './find-all-time-offs.query';
import { TIME_OFF_TOKEN } from 'src/application/common/constants/tokens';
import { ITimeOffRepository } from 'src/application/common/interfaces/time-off/time-off-repository.interface';
import { Inject } from '@nestjs/common';
import { EdgesResponse } from 'src/application/common/types/query-return.type';
import { TimeOff } from 'src/domain/time-off/TimeOff';

@QueryHandler(FindAllTimeOffsQuery)
class FindAllTimeOffsHandler implements IQueryHandler<FindAllTimeOffsQuery> {
  constructor(
    @Inject(TIME_OFF_TOKEN)
    private readonly timeOffRepository: ITimeOffRepository,
  ) {}

  async execute({}: FindAllTimeOffsQuery): Promise<EdgesResponse<TimeOff>> {
    return this.timeOffRepository.findAll();
  }
}

export default FindAllTimeOffsHandler;