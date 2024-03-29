import { Case } from '@domain/case';
import { CaseQueryOptionsInput } from '@domain/case/dtos/query-options.input';
export interface ICaseRepository {
  create(dto: Case): Promise<Case>;
  update(dto: Case): Promise<Case>;
  findOneById(id: string): Promise<Case>;
  findAll(options: CaseQueryOptionsInput): Promise<Array<Case>>;
}
