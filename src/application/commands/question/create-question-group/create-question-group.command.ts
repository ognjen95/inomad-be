import { CreateQuestionGroupInput } from '@domain/question/dtos/create-question-group.input';
import { CurrentUserInfo } from '@presentation/resolvers/auth/types';

export class CreateQuestionGroupCommand {
  constructor(
    public readonly dto: CreateQuestionGroupInput,
    public readonly currentUser: CurrentUserInfo,
  ) {}
}
