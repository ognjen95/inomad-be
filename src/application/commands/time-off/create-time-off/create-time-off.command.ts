import { CreateTimeOffDto } from 'src/application/common/dtos/time-off/create-time-off.dto';

export class CreateTimeOffCommand {
  constructor(public readonly dto: CreateTimeOffDto) {}
}
