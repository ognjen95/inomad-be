import { TaskQueryOptionsInput } from 'src/domain/tasks/dto/task-query-options.input';
import { CurrentUserInfo } from 'src/presentation/resolvers/auth/types';

export class FindAllTasksQuery {
  constructor(
    public readonly options: TaskQueryOptionsInput,
    public readonly currentUser: CurrentUserInfo,
  ) {}
}
