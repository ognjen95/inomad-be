import { QuestionGroupOptionsInput } from 'src/domain/question/dtos/question-group-query-options.input';
import { CurrentUserInfo } from 'src/presentation/resolvers/auth/types';

export class FindAllQuestionGroupsQuery {
  constructor(
    public readonly currentUser: CurrentUserInfo,
    public readonly queryOptions?: QuestionGroupOptionsInput,
  ) {}
}
