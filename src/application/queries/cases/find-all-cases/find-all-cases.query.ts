import { CaseQueryOptionsInput } from 'src/domain/case/dtos/query-options.input';
import { UserRoles } from 'src/domain/user/enums';
import { CurrentUserInfo } from 'src/presentation/resolvers/auth/types';

export class FindAllCasesQuery {
  constructor(
    public options?: CaseQueryOptionsInput,
    public currentUser?: CurrentUserInfo,
  ) {
    if (currentUser.userRole === UserRoles.CUSTOMER) {
      this.options.userId = this.currentUser.userId;
    }
  }
}
