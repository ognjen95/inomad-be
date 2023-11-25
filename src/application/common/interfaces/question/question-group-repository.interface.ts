import { QuestionGroupOptionsInput } from '@domain/question/dtos/question-group-query-options.input';
import { QuestionGroup } from '@domain/question/entity/question-group';
import { CurrentUserInfo } from '@presentation/resolvers/auth/types';

export interface IQuestionGroupRepository {
  create(dto: QuestionGroup): Promise<QuestionGroup>;
  update(dto: QuestionGroup): Promise<QuestionGroup>;
  findAll(
    queryOptions: QuestionGroupOptionsInput,
    user: CurrentUserInfo,
  ): Promise<Array<QuestionGroup>>;
}
