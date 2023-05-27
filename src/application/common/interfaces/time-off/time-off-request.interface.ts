import { TimeOffRequest } from 'src/domain/time-off/TimeOffRequest';
import { EdgesResponse } from '../../types/query-return.type';
import { TimeOffRequestQueryOptions } from 'src/domain/time-off/dtos/time-off-request-query-options';

export interface ITimeOffRequestRepository {
  create(dto: TimeOffRequest): Promise<TimeOffRequest>;
  update(dto: TimeOffRequest): Promise<TimeOffRequest>;
  findOneById(id: string): Promise<TimeOffRequest>;
  findAll(
    dto: TimeOffRequestQueryOptions,
  ): Promise<EdgesResponse<TimeOffRequest>>;
}
