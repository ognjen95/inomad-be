import { CreateTimeOffRequestDto } from 'src/domain/time-off/dtos/create-time-off-request.dto';

export class CreateTimeOffRequestCommand {
  constructor(public readonly dto: CreateTimeOffRequestDto) {}
}
