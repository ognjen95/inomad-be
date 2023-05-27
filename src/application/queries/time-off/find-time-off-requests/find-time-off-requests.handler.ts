import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindTimeOffRequestsQuery } from './find-time-off-requests.query';
import { TIME_OFF_TOKEN_REQUEST } from 'src/application/common/constants/tokens';
import { Inject } from '@nestjs/common';
import { EdgesResponse } from 'src/application/common/types/query-return.type';
import { ITimeOffRequestRepository } from 'src/application/common/interfaces/time-off/time-off-request.interface';
import { TimeOffRequest } from 'src/domain/time-off/TimeOffRequest';

@QueryHandler(FindTimeOffRequestsQuery)
class FindTimeOffRequestsHandler
  implements IQueryHandler<FindTimeOffRequestsQuery>
{
  constructor(
    @Inject(TIME_OFF_TOKEN_REQUEST)
    private readonly timeOffRequestRepository: ITimeOffRequestRepository,
  ) {}

  async execute({
    dto,
  }: FindTimeOffRequestsQuery): Promise<EdgesResponse<TimeOffRequest>> {
    return await this.timeOffRequestRepository.findAll(dto);
  }
}

export default FindTimeOffRequestsHandler;
