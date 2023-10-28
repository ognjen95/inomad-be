import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { plainToInstance } from 'class-transformer';
import { Task } from 'src/domain/tasks/task';
import { ITaskRepository } from 'src/application/common/interfaces/task/task-repository.interface';
import { TaskQueryOptionsInput } from 'src/domain/tasks/dto/task-query-options.input';

@Injectable()
export class TaskRepository implements ITaskRepository {
  private readonly caseSensitive = 'insensitive';

  @Inject()
  protected readonly db: PrismaService;

  async create(
    dto: Task,
    author: {
      id: string;
      name: string;
      img?: string;
    },
  ): Promise<Task> {
    const createdTask = await this.db.task.upsert({
      where: {
        id: dto.getId,
      },
      create: {
        name: dto.getName,
        description: dto.getDescription,
        startDate: dto.getStartDate,
        endDate: dto.getEndDate,
        taskStatus: dto.getStatus,
        priority: dto.getPriority,
        taskType: dto.getType,
        caseId: dto.getCaseId,
        assigneesIds: dto.getAssigneeIds,
        caseName: dto.getCaseName,
        createdById: author.id,
        createdByName: author.name,
      },
      update: {
        name: dto.getName,
        description: dto.getDescription,
        startDate: dto.getStartDate,
        endDate: dto.getEndDate,
        taskStatus: dto.getStatus,
        priority: dto.getPriority,
        taskType: dto.getType,
        caseId: dto.getCaseId,
        assigneesIds: dto.getAssigneeIds,
        caseName: dto.getCaseName,
        createdById: author.id,
        createdByName: author.name,
      },
    });

    return plainToInstance(Task, createdTask);
  }

  async findOneById(id: string): Promise<Task> {
    const task = await this.db.task.findUnique({
      where: {
        id,
      },
    });

    return plainToInstance(Task, task);
  }

  async findAll(
    options: TaskQueryOptionsInput,
    userId: string,
  ): Promise<Task[]> {
    const tasks = await this.db.task.findMany({
      where: {
        id: options?.id,
        OR: [
          {
            createdById: userId,
          },
          {
            assigneesIds: {
              has: userId,
            },
          },
          {
            id: options?.id,
          },
        ],
      },
      include: {
        assignees: true,
      },
      orderBy: {
        startDate: 'desc',
      },
    });

    return plainToInstance(Task, tasks);
  }

  async update(dto: Task): Promise<Task> {
    const updatedTask = await this.db.task.update({
      where: {
        id: dto.getId,
      },
      data: {
        name: dto.getName,
        description: dto.getDescription,
        startDate: dto.getStartDate,
        endDate: dto.getEndDate,
        taskStatus: dto.getStatus,
        caseId: dto.getCaseId,
        assigneesIds: dto.getAssigneeIds,
        caseName: dto.getCaseName,
      },
    });

    return plainToInstance(Task, updatedTask);
  }
}
