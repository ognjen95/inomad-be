import { UpdateTimeOffDto } from 'src/domain/time-off/dtos/update-time-off.dto';

export class UpdateTimeOffCommand {
  constructor(public readonly dto: UpdateTimeOffDto) {}
}
