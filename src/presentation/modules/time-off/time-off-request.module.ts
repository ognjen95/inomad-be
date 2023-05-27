import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import CreateTimeOffRequestHandler from 'src/application/commands/time-off/create-time-off-request/create-time-off-request.handler';
import UpdateTimeOffRequestHandler from 'src/application/commands/time-off/update-time-off-request/update-time-off-request.handler';
import { TIME_OFF_TOKEN_REQUEST } from 'src/application/common/constants/tokens';
import FindTimeOffRequestsHandler from 'src/application/queries/time-off/find-time-off-requests/find-time-off-requests.handler';
import { TimeOffRequestRepository } from 'src/infrastructure/repositories/time-off/time-off-request.repository';
import { TimeOffRequestResolver } from 'src/presentation/resolvers/time-off/time-off-request.resolver';

@Module({
  imports: [CqrsModule],
  providers: [
    TimeOffRequestResolver,
    CreateTimeOffRequestHandler,
    UpdateTimeOffRequestHandler,
    FindTimeOffRequestsHandler,
    {
      provide: TIME_OFF_TOKEN_REQUEST,
      useClass: TimeOffRequestRepository,
    },
  ],
})
export class TimeOffRequestModule {}
