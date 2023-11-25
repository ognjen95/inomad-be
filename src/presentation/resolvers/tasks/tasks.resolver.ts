import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TaskEntity } from '../../../domain/tasks/task.entity';
import { CreateTaskInput } from '../../../domain/tasks/dto/create-task.input';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateTaskCommand } from '@application/commands/tasks/create-task/create-task.command';
import { CurrentUser } from '@presentation/decorators/current-user';
import { CurrentUserInfo } from '../auth/types';
import { FindAllTasksQuery } from '@application/queries/tasks/get-all-tasks/get-all-tasks.query';
import { TaskQueryOptionsInput } from '@domain/tasks/dto/task-query-options.input';
import { connectionFromArray } from 'graphql-relay';
import { TaskConnection } from '@domain/tasks/tasks-connection';

@Resolver(() => TaskEntity)
export class TasksResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Mutation(() => TaskEntity)
  async createTask(
    @Args('createTaskInput') createTaskInput: CreateTaskInput,
    @CurrentUser() currentUser: CurrentUserInfo,
  ) {
    const taskCommand = new CreateTaskCommand(createTaskInput, currentUser);

    return await this.commandBus.execute<CreateTaskCommand, TaskEntity>(
      taskCommand,
    );
  }

  @Query(() => TaskConnection, { name: 'tasks' })
  async findAll(
    @Args('options', { nullable: true }) options: TaskQueryOptionsInput,
    @CurrentUser() currentUser: CurrentUserInfo,
  ) {
    const findAllTasksQuery = new FindAllTasksQuery(options, currentUser);

    const tasks = await this.queryBus.execute<
      FindAllTasksQuery,
      Array<TaskEntity>
    >(findAllTasksQuery);

    return connectionFromArray(tasks, {});
  }
}
