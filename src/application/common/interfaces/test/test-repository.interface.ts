import { Test } from 'src/domain/test/Test';
import { TestQueryOptionsInput } from 'src/domain/test/dtos/tests/test-query-options.input';

export interface ITestRepository {
  upsert(dto: Test): Promise<Test>;
  findAll(queryOptions?: TestQueryOptionsInput): Promise<Array<Test>>;
  findOneById(id: string): Promise<Test>;
  copayAndAssignTemplate(test: Test): Promise<Test>;
}
