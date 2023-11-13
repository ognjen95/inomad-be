import { CreateQuestionGroupInput } from 'src/domain/question/dtos/create-question-group.input';
import { CurrentUserInfo } from 'src/presentation/resolvers/auth/types';

export class CreateQuestionGroupCommand {
  constructor(
    public readonly dto: CreateQuestionGroupInput,
    public readonly currentUser: CurrentUserInfo,
  ) {}
}
