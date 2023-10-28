import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateTaskCommand } from './create-task.command';
import { ITaskRepository } from 'src/application/common/interfaces/task/task-repository.interface';
import { Task } from 'src/domain/tasks/task';
import { Inject } from '@nestjs/common';
import {
  CASE_REPOSITORY_TOKEN,
  TASK_REPOSITORY_TOKEN,
} from 'src/application/common/constants/tokens';
import { ICaseRepository } from 'src/application/common/interfaces/case/case-request-repository.interface';

@CommandHandler(CreateTaskCommand)
class CreateTaskHandler implements ICommandHandler<CreateTaskCommand> {
  constructor(
    @Inject(TASK_REPOSITORY_TOKEN)
    private readonly taskRepository: ITaskRepository,
    @Inject(CASE_REPOSITORY_TOKEN)
    private readonly caseRepository: ICaseRepository,
  ) {}

  async execute({ dto, author }: CreateTaskCommand): Promise<Task> {
    const task = new Task(
      dto.name,
      dto.startDate,
      dto.endDate,
      dto.status,
      dto.priority,
      dto.type,
      dto.description,
      dto.caseId,
      dto.assigneeIds,
    );

    task.setId = dto.id;

    if (dto.caseId) {
      const caseRequest = await this.caseRepository.findOneById(dto.caseId);

      if (!caseRequest) throw new Error('Case not found');

      task.setCaseName = caseRequest.getName;
    }

    const createdTask = await this.taskRepository.create(task, author);

    return createdTask;
  }
}

export default CreateTaskHandler;
