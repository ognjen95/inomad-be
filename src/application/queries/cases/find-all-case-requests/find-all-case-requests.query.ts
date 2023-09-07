import { CaseQueryOptionsInput } from 'src/domain/case/dtos/query-options.input';
import { CurrentUserInfo } from 'src/presentation/resolvers/auth/types';

export class FindAllCaseRequestsQuery {
  constructor(
    public options?: CaseQueryOptionsInput,
    public currentUser?: CurrentUserInfo,
  ) {}
}
