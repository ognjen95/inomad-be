import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindByEmployeeIdQuery } from './find-by-employee-id.query';
import { TIME_OFF_TOKEN } from '@application/common/constants/tokens';
import { ITimeOffRepository } from '@application/common/interfaces/time-off/time-off-repository.interface';
import { Inject } from '@nestjs/common';
import { Connection, connectionFromArray } from 'graphql-relay';
import { TimeOff } from '@domain/time-off/entity/TimeOff';

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
  }: FindByEmployeeIdQuery): Promise<Connection<TimeOff>> {
    const timeOffs = await this.timeOffRepository.findByEmployeeId(
      employeeId,
      forYear,
    );

    return connectionFromArray(timeOffs, {});
  }
}

export default FindByEmployeeIdQueryHandler;
