import { UpdateTimeOffRequestDto } from 'src/domain/time-off/dtos/update-time-off-request.dto';

export class UpdateTimeOffRequestCommand {
  constructor(public readonly dto: UpdateTimeOffRequestDto) {}
}
