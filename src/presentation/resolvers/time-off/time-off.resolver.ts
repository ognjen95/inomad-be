import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TimeOffEntity } from '../../entities/time-off/time-off.entity';
import { CreateTimeOffInput } from '../../dto/time-off/create-time-off.input';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateTimeOffCommand } from 'src/application/commands/time-off/create-time-off/create-time-off.command';
import { TimeOff } from 'src/domain/time-off/TimeOff';
import { FindAllTimeOffsQuery } from 'src/application/queries/time-off/find-all-time-offs/find-all-time-offs.query';
import { TimeOffEntityEdgesEntity } from 'src/presentation/entities/time-off/time-off-edges.entity';
import { FindByEmployeeIdQuery } from 'src/application/queries/time-off/find-by-employee-id/find-by-employee-id..query';

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

  @Query(() => TimeOffEntityEdgesEntity, { name: 'findAllTimeOffs' })
  async findAll() {
    return await this.queryBus.execute<FindAllTimeOffsQuery, TimeOff>(
      new FindAllTimeOffsQuery(),
    );
  }

  @Query(() => [TimeOffEntity], { name: 'findTimeOffsByEmployeeId' })
  async findByEmployeeId(
    @Args('employeeId') employeeId: string,
    @Args('forYear') forYear: number,
  ) {
    return await this.queryBus.execute<FindByEmployeeIdQuery, TimeOff>(
      new FindByEmployeeIdQuery(employeeId, forYear),
    );
  }
}
