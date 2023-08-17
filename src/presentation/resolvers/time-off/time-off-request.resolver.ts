import { Resolver, Query, Mutation, Args, ResolveField } from '@nestjs/graphql';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { TimeOffRequestEntity } from 'src/presentation/entities/time-off/time-off-request';
import { CreateTimeOffRequestInput } from 'src/presentation/dto/time-off/create-time-off-request.input';
import { CreateTimeOffRequestCommand } from 'src/application/commands/time-off/create-time-off-request/create-time-off-request.command';
import { UpdateTimeOffRequestCommand } from 'src/application/commands/time-off/update-time-off-request/update-time-off-request.command';
import { UpdateTimeOffRequestInput } from 'src/presentation/dto/time-off/update-time-off-request.input';
import { TimeOffRequestEdgesEntity } from 'src/presentation/entities/time-off/time-off-request-edges.entity';
import { FindTimeOffRequestsQuery } from 'src/application/queries/time-off/find-time-off-requests/find-time-off-requests.query';
import { TimeOffRequest } from 'src/domain/time-off/TimeOffRequest';
import { TimeOffRequestQueryOptions } from 'src/presentation/dto/time-off/time-off-request-query-options';

@Resolver(() => TimeOffRequestEntity)
export class TimeOffRequestResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Mutation(() => TimeOffRequestEntity)
  async createTimeOffRequest(
    @Args('createTimeOffRequestInput')
    createTimeOffRequestInput: CreateTimeOffRequestInput,
  ) {
    return await this.commandBus.execute<
      CreateTimeOffRequestCommand,
      TimeOffRequest
    >(new CreateTimeOffRequestCommand(createTimeOffRequestInput));
  }

  @Mutation(() => TimeOffRequestEdgesEntity)
  async updateTimeOffRequest(
    @Args('updateTimeOffRequestInput')
    updateTimeOffRequestInput: UpdateTimeOffRequestInput,
  ) {
    return await this.commandBus.execute<
      UpdateTimeOffRequestCommand,
      TimeOffRequest
    >(new UpdateTimeOffRequestCommand(updateTimeOffRequestInput));
  }

  // @Query(() => TimeOffRequestEdgesEntity, { name: 'findTimeOffRequests' })
  // async timeOffRequests(
  //   @Args('timeOffRequestQueryOptions', { nullable: true })
  //   timeOffRequestQueryOptions?: TimeOffRequestQueryOptions,
  // ) {
  //   return await this.queryBus.execute<
  //     FindTimeOffRequestsQuery,
  //     TimeOffRequest
  //   >(new FindTimeOffRequestsQuery(timeOffRequestQueryOptions));
  // }
}
