import { Question } from 'src/domain/question/Question';
import { EdgesResponse } from '../../types/query-return.type';
import { QueryOptions } from '../../dtos/query-options/query-options.dto';

export interface IQuestionRepository {
  create(dto: Question): Promise<Question>;
  findAll(queryOptions?: QueryOptions): Promise<EdgesResponse<Question>>;
  findAllByIds(ids: string[], queryOptions?: QueryOptions): Promise<Question[]>;
  findOneById(id: string): Promise<Question>;
  update(id: string, dto: Question): Promise<Question>;
  //   remove(id: string): Promise<Question>;
}
