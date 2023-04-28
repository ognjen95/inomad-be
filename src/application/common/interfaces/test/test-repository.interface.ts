import { EdgesResponse } from '../../types/query-return.type';
import { QueryOptions } from '../../dtos/query-options/query-options.dto';
import { Test } from 'src/domain/test/Test';

export interface ITestRepository {
  create(dto: Test): Promise<Test>;
  findAll(queryOptions?: QueryOptions): Promise<EdgesResponse<Test>>;
  findOneById(id: string): Promise<Test>;
  //   update(id: string, Question: Partial<Question>): Promise<Question>;
  //   remove(id: string): Promise<Question>;
}
