import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import {
  TimeOffEntity,
  TimeOffConnection,
} from '../../../domain/time-off/time-off.entity';
import { CreateTimeOffInput } from '../../../domain/time-off/dtos/time-off/create-time-off.input';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateTimeOffCommand } from '@application/commands/time-off/create-time-off/create-time-off.command';
import { TimeOff } from '@domain/time-off/TimeOff';
import { FindAllTimeOffsQuery } from '@application/queries/time-off/find-all-time-offs/find-all-time-offs.query';
import { FindByEmployeeIdQuery } from '@application/queries/time-off/find-by-employee-id/find-by-employee-id.query';
import { UpdateTimeOffInput } from '@domain/time-off/dtos/time-off/update-time-off.input';
import { UpdateTimeOffCommand } from '@application/commands/time-off/update-time-off/update-time-off.command';
import { TimeOffRequest } from '@prisma/client';
import { TimeOffRequestEdgesEntity } from '@domain/time-off/time-off-request-edges.entity';
import { FindTimeOffRequestsQuery } from '@application/queries/time-off/find-time-off-requests/find-time-off-requests.query';
import { TimeOffRequestQueryOptions } from '@domain/time-off/dtos/time-off/time-off-request-query-options';

@Resolver(() => TimeOffEntity)
export class TimeOffResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Mutation(() => TimeOffEntity)
  async createTimeOff(
    @Args('createTimeOffInput') createTimeOffInput: CreateTimeOffInput,
  ) {
    return await this.commandBus.execute<CreateTimeOffCommand, TimeOff>(
      new CreateTimeOffCommand(createTimeOffInput),
    );
  }

  @Mutation(() => TimeOffEntity, { name: 'updateTimeOff' })
  async update(
    @Args('updateTimeOffInput') updateTimeOffInput: UpdateTimeOffInput,
  ) {
    return await this.commandBus.execute<UpdateTimeOffCommand, TimeOff>(
      new UpdateTimeOffCommand(updateTimeOffInput),
    );
  }

  @Query(() => TimeOffConnection, { name: 'timeOffs' })
  async findAll() {
    return await this.queryBus.execute<FindAllTimeOffsQuery, TimeOff>(
      new FindAllTimeOffsQuery(),
    );
  }

  @Query(() => TimeOffConnection, { name: 'timeOffsByUserId' })
  async findByEmployeeId(
    @Args('employeeId') employeeId: string,
    @Args('forYear') forYear: number,
  ) {
    return await this.queryBus.execute<FindByEmployeeIdQuery, TimeOff>(
      new FindByEmployeeIdQuery(employeeId, forYear),
    );
  }

  @ResolveField(() => TimeOffRequestEdgesEntity)
  async timeOffRequests(
    @Parent() timeOff: TimeOffEntity,
    @Args('timeOffRequestQueryOptions', { nullable: true })
    timeOffRequestQueryOptions?: TimeOffRequestQueryOptions,
  ) {
    return await this.queryBus.execute<
      FindTimeOffRequestsQuery,
      TimeOffRequest
    >(new FindTimeOffRequestsQuery(timeOffRequestQueryOptions));
  }
}
