import { FindTimeOffRequestsDto } from 'src/domain/time-off/dtos/find-time-off-requests.dto';

export class FindTimeOffRequestsQuery {
  constructor(public readonly dto: FindTimeOffRequestsDto) {}
}
