import { CaseRequest } from 'src/domain/case-request/case-request';

import { CaseQueryOptionsInput } from 'src/domain/case/dtos/query-options.input';
export interface ICaseRequestRepository {
  create(dto: CaseRequest): Promise<void>;
  update(dto: CaseRequest): Promise<void>;
  findOneById(id: string): Promise<CaseRequest>;
  findAll(options: CaseQueryOptionsInput): Promise<Array<CaseRequest>>;
}
