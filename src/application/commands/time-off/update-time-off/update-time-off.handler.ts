import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateTimeOffCommand } from './update-time-off.command';
import { TimeOff } from '@domain/time-off/entity/TimeOff';
import { ITimeOffRepository } from '@application/common/interfaces/time-off/time-off-repository.interface';
import { Inject } from '@nestjs/common';
import { TIME_OFF_TOKEN } from '@application/common/constants/tokens';

@CommandHandler(UpdateTimeOffCommand)
class UpdateTimeOffHandler implements ICommandHandler<UpdateTimeOffCommand> {
  constructor(
    @Inject(TIME_OFF_TOKEN)
    private readonly timeOffRepository: ITimeOffRepository,
  ) {}

  async execute({ dto }: UpdateTimeOffCommand): Promise<TimeOff> {
    const timeOff = await this.timeOffRepository.findOneById(dto.timeOffId);

    timeOff.update(dto);

    return await this.timeOffRepository.update(timeOff);
  }
}

export default UpdateTimeOffHandler;
