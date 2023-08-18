import { Case } from 'src/domain/case/case';
import { CaseQueryOptionsInput } from 'src/domain/case/dtos/query-options.input';
export interface ICaseRepository {
  create(dto: Case): void;
  update(dto: Case): void;
  findOneById(id: string): Promise<Case>;
  findAll(options: CaseQueryOptionsInput): Promise<Array<Case>>;
}
