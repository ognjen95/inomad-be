import { CaseQueryOptionsInput } from 'src/domain/case/dtos/query-options.input';

export class FindAllCasesQuery {
  constructor(public options?: CaseQueryOptionsInput) {}
}
