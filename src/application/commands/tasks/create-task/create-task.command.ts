import { CreateTaskInput } from 'src/domain/tasks/dto/create-task.input';
import { CurrentUserInfo } from 'src/presentation/resolvers/auth/types';

export class CreateTaskCommand {
  readonly author: {
    id: string;
    name: string;
  };

  constructor(
    public readonly dto: CreateTaskInput,
    public readonly currentUser: CurrentUserInfo,
  ) {
    const author = {
      id: currentUser.userId,
      name: `${currentUser.firstName} ${currentUser.lastName}`,
    };

    this.author = author;
  }
}
