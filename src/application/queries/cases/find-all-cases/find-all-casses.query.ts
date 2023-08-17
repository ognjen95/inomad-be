import { UserQueryOptions } from 'src/domain/user/dtos/user-query-options';

export class FindAllCasesQuery {
  constructor(public options?: UserQueryOptions) {}
}
