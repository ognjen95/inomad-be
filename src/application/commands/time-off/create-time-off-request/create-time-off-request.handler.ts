import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateTimeOffRequestCommand } from './create-time-off-request.command';
import { Inject } from '@nestjs/common';
import { TIME_OFF_TOKEN_REQUEST } from 'src/application/common/constants/tokens';
import { ITimeOffRequestRepository } from 'src/application/common/interfaces/time-off/time-off-request.interface';
import { TimeOffRequest } from 'src/domain/time-off/TimeOffRequest';

@CommandHandler(CreateTimeOffRequestCommand)
class CreateTimeOffRequestHandler
  implements ICommandHandler<CreateTimeOffRequestCommand>
{
  constructor(
    @Inject(TIME_OFF_TOKEN_REQUEST)
    private readonly timeOffRequestRepository: ITimeOffRequestRepository,
  ) {}

  async execute({ dto }: CreateTimeOffRequestCommand): Promise<TimeOffRequest> {
    const timeOffRequest = new TimeOffRequest(
      dto.timeOffId,
      dto.startDate,
      dto.endDate,
      dto.reason,
      dto.requestedById,
    );

    return await this.timeOffRequestRepository.create(timeOffRequest);
  }
}

export default CreateTimeOffRequestHandler;
