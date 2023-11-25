import { TaskQueryOptionsInput } from '@domain/tasks/dto/task-query-options.input';
import { Task } from '@domain/tasks/task';

export type ITaskRepository = {
  create(
    dto: Task,
    author: {
      id: string;
      name: string;
      img?: string;
    },
  ): Promise<Task>;

  findOneById(id: string): Promise<Task>;

  findAll(options: TaskQueryOptionsInput, userId: string): Promise<Task[]>;

  update(dto: Task): Promise<Task>;
};
