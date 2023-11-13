import { QuestionGroupOptionsInput } from 'src/domain/question/dtos/question-group-query-options.input';
import { QuestionGroup } from 'src/domain/question/question-group';
import { CurrentUserInfo } from 'src/presentation/resolvers/auth/types';

export interface IQuestionGroupRepository {
  create(dto: QuestionGroup): Promise<QuestionGroup>;
  update(dto: QuestionGroup): Promise<QuestionGroup>;
  findAll(
    queryOptions: QuestionGroupOptionsInput,
    user: CurrentUserInfo,
  ): Promise<Array<QuestionGroup>>;
}
