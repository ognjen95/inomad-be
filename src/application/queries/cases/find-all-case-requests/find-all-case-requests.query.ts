import { CaseQueryOptionsInput } from '@domain/case/dtos/query-options.input';
import { CurrentUserInfo } from '@presentation/resolvers/auth/types';

export class FindAllCaseRequestsQuery {
  constructor(
    public options?: CaseQueryOptionsInput,
    public currentUser?: CurrentUserInfo,
  ) {}
}
