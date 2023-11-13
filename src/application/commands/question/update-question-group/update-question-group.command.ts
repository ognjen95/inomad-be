import { UpdateQuestionGroupInput } from 'src/domain/question/dtos/update-question-group.input';
import { CurrentUserInfo } from 'src/presentation/resolvers/auth/types';

export class UpdateQuestionGroupCommand {
  constructor(
    public readonly dto: UpdateQuestionGroupInput,
    public readonly currentUser: CurrentUserInfo,
  ) {}
}
