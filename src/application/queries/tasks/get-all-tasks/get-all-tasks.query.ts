import { TaskQueryOptionsInput } from '@domain/tasks/dto/task-query-options.input';
import { CurrentUserInfo } from '@presentation/resolvers/auth/types';

export class FindAllTasksQuery {
  constructor(
    public readonly options: TaskQueryOptionsInput,
    public readonly currentUser: CurrentUserInfo,
  ) {}
}
