import { CreateTimeOffDto } from '@domain/time-off/dtos/create-time-off.dto';

export class CreateTimeOffCommand {
  constructor(public readonly dto: CreateTimeOffDto) {}
}
