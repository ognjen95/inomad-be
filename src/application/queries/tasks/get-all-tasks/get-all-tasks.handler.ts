import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindAllTasksQuery } from './get-all-tasks.query';
import { ITaskRepository } from '@application/common/interfaces/task/task-repository.interface';
import { Task } from '@domain/tasks/task';
import { Inject } from '@nestjs/common';
import { TASK_REPOSITORY_TOKEN } from '@application/common/constants/tokens';

@QueryHandler(FindAllTasksQuery)
class FindAllTasksHandler implements IQueryHandler<FindAllTasksQuery> {
  constructor(
    @Inject(TASK_REPOSITORY_TOKEN)
    private readonly taskRepository: ITaskRepository,
  ) {}

  async execute({
    currentUser,
    options,
  }: FindAllTasksQuery): Promise<Array<Task>> {
    return await this.taskRepository.findAll(options, currentUser.userId);
  }
}

export default FindAllTasksHandler;
