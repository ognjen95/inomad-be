import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateTimeOffCommand } from './create-time-off.command';
import { TimeOff } from '@domain/time-off/entity/TimeOff';
import { ITimeOffRepository } from '@application/common/interfaces/time-off/time-off-repository.interface';
import { Inject } from '@nestjs/common';
import { TIME_OFF_TOKEN } from '@application/common/constants/tokens';

@CommandHandler(CreateTimeOffCommand)
class CreateTimeOffHandler implements ICommandHandler<CreateTimeOffCommand> {
  constructor(
    @Inject(TIME_OFF_TOKEN)
    private readonly timeOffRepository: ITimeOffRepository,
  ) {}

  async execute({ dto }: CreateTimeOffCommand): Promise<TimeOff> {
    const timeOff = new TimeOff(dto.name, dto.forYear, dto.totalDays);

    return await this.timeOffRepository.create(timeOff);
  }
}

export default CreateTimeOffHandler;
