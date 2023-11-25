import { TestQueryOptionsInput } from '@domain/test/dtos/tests/test-query-options.input';
import { CurrentUserInfo } from '@presentation/resolvers/auth/types';

export class FindAllTestsQuery {
  constructor(
    public readonly currentUser: CurrentUserInfo,
    public readonly queryOptions?: TestQueryOptionsInput,
  ) {
    if (currentUser.tenantId) {
      this.queryOptions = {
        ...this.queryOptions,
        providerCompanyId: currentUser.tenantId,
      };
    }
  }
}
