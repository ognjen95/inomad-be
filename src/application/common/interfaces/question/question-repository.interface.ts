import { Question } from 'src/domain/question/question';
import { EdgesResponse } from '../../types/query-return.type';

export interface IQuestionRepository {
  create(dto: Question): Promise<Question>;
  createMany(dtos: Question[]): Promise<Question[]>;
  findAll(queryOptions?: any): Promise<EdgesResponse<Question>>;
  findAllByIds(ids: string[], queryOptions?: any): Promise<Question[]>;
  findOneById(id: string): Promise<Question>;
  update(id: string, dto: Question): Promise<Question>;
  //   remove(id: string): Promise<Question>;
}
