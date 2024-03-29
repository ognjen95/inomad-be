import { Module } from '@nestjs/common';
import { TimeOffResolver } from '../../resolvers/time-off/time-off.resolver';
import { CqrsModule } from '@nestjs/cqrs';
import { TimeOffRepository } from '@infrastructure/repositories/time-off/time-off.repository';
import { TIME_OFF_TOKEN } from '@application/common/constants/tokens';
import CreateTimeOffHandler from '@application/commands/time-off/create-time-off/create-time-off.handler';
import FindAllTimeOffsHandler from '@application/queries/time-off/find-all-time-offs/find-all-time-offs.handler';
import FindByEmployeeIdQueryHandler from '@application/queries/time-off/find-by-employee-id/find-by-employee-id.handler';
import UpdateTimeOffHandler from '@application/commands/time-off/update-time-off/update-time-off.handler';

@Module({
  imports: [CqrsModule],
  providers: [
    TimeOffResolver,
    CreateTimeOffHandler,
    FindAllTimeOffsHandler,
    FindByEmployeeIdQueryHandler,
    UpdateTimeOffHandler,
    {
      provide: TIME_OFF_TOKEN,
      useClass: TimeOffRepository,
    },
  ],
})
export class TimeOffModule {}
