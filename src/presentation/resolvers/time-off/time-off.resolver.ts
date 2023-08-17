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
} from '../../entities/time-off/time-off.entity';
import { CreateTimeOffInput } from '../../dto/time-off/create-time-off.input';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateTimeOffCommand } from 'src/application/commands/time-off/create-time-off/create-time-off.command';
import { TimeOff } from 'src/domain/time-off/TimeOff';
import { FindAllTimeOffsQuery } from 'src/application/queries/time-off/find-all-time-offs/find-all-time-offs.query';
import { FindByEmployeeIdQuery } from 'src/application/queries/time-off/find-by-employee-id/find-by-employee-id.query';
import { UpdateTimeOffInput } from 'src/presentation/dto/time-off/update-time-off.input';
import { UpdateTimeOffCommand } from 'src/application/commands/time-off/update-time-off/update-time-off.command';
import { TimeOffRequest } from '@prisma/client';
import { TimeOffRequestEdgesEntity } from 'src/presentation/entities/time-off/time-off-request-edges.entity';
import { FindTimeOffRequestsQuery } from 'src/application/queries/time-off/find-time-off-requests/find-time-off-requests.query';
import { TimeOffRequestQueryOptions } from 'src/presentation/dto/time-off/time-off-request-query-options';

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
    console.log({ timeOff });
    return await this.queryBus.execute<
      FindTimeOffRequestsQuery,
      TimeOffRequest
    >(new FindTimeOffRequestsQuery(timeOffRequestQueryOptions));
  }
}
