import { CaseQueryOptionsInput } from 'src/domain/case/dtos/query-options.input';

export class FindAllCaseRequestsQuery {
  constructor(public options?: CaseQueryOptionsInput) {}
}
