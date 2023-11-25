import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateTimeOffRequestCommand } from './update-time-off-request.command';
import { Inject } from '@nestjs/common';
import { TIME_OFF_TOKEN_REQUEST } from '@application/common/constants/tokens';
import { ITimeOffRequestRepository } from '@application/common/interfaces/time-off/time-off-request.interface';
import { TimeOffRequest } from '@domain/time-off/TimeOffRequest';

@CommandHandler(UpdateTimeOffRequestCommand)
class UpdateTimeOffRequestHandler
  implements ICommandHandler<UpdateTimeOffRequestCommand>
{
  constructor(
    @Inject(TIME_OFF_TOKEN_REQUEST)
    private readonly timeOffRequestRepository: ITimeOffRequestRepository,
  ) {}

  async execute({ dto }: UpdateTimeOffRequestCommand): Promise<TimeOffRequest> {
    const timeOffRequest = await this.timeOffRequestRepository.findOneById(
      dto.id,
    );

    timeOffRequest.setApprovedAt = dto.approvedAt;
    timeOffRequest.setDeclinedAt = dto.declinedAt;
    timeOffRequest.setApprovedById = dto.approvedById;

    return await this.timeOffRequestRepository.update(timeOffRequest);
  }
}

export default UpdateTimeOffRequestHandler;
