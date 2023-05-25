import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindByEmployeeIdQuery } from './find-by-employee-id..query';
import { TIME_OFF_TOKEN } from 'src/application/common/constants/tokens';
import { ITimeOffRepository } from 'src/application/common/interfaces/time-off/time-off-repository.interface';
import { Inject } from '@nestjs/common';
import { TimeOff } from 'src/domain/time-off/TimeOff';

@QueryHandler(FindByEmployeeIdQuery)
class FindByEmployeeIdQueryHandler
  implements IQueryHandler<FindByEmployeeIdQuery>
{
  constructor(
    @Inject(TIME_OFF_TOKEN)
    private readonly timeOffRepository: ITimeOffRepository,
  ) {}

  async execute({
    employeeId,
    forYear,
  }: FindByEmployeeIdQuery): Promise<TimeOff[]> {
    return this.timeOffRepository.findByEmployeeId(employeeId, forYear);
  }
}

export default FindByEmployeeIdQueryHandler;
