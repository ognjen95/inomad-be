import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { TimeOffRequestEntity } from '@domain/time-off/entity/time-off-request';
import { CreateTimeOffRequestInput } from '@domain/time-off/dtos/time-off/create-time-off-request.input';
import { CreateTimeOffRequestCommand } from '@application/commands/time-off/create-time-off-request/create-time-off-request.command';
import { UpdateTimeOffRequestCommand } from '@application/commands/time-off/update-time-off-request/update-time-off-request.command';
import { UpdateTimeOffRequestInput } from '@domain/time-off/dtos/time-off/update-time-off-request.input';
import { TimeOffRequestEdgesEntity } from '@domain/time-off/entity/time-off-request-edges.entity';
import { TimeOffRequest } from '@domain/time-off/entity/TimeOffRequest';

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
