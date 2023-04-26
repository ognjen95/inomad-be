import { EdgesResponse } from '../../types/query-return.type';
import { QueryOptions } from '../../dtos/query-options/query-options.dto';
import { QuestionGroup } from 'src/domain/question/QuestionGroup';

export interface IQuestionGroupRepository {
  create(dto: QuestionGroup): Promise<QuestionGroup>;
  findAll(queryOptions?: QueryOptions): Promise<EdgesResponse<QuestionGroup>>;
}
