import { CaseRequest } from '@domain/case-request/entity/case-request';

import { CaseQueryOptionsInput } from '@domain/case/dtos/query-options.input';
export interface ICaseRequestRepository {
  create(dto: CaseRequest): Promise<void>;
  update(dto: CaseRequest): Promise<void>;
  findOneById(id: string): Promise<CaseRequest>;
  findAll(options: CaseQueryOptionsInput): Promise<Array<CaseRequest>>;
  findManyByApplicantId(options?: CaseQueryOptionsInput): Promise<CaseRequest[]>;
}
