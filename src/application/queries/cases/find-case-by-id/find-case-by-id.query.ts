import { UserRoles } from "../../../../domain/user/enums";
import { CurrentUser } from "../../../../presentation/decorators/current-user";
import { CurrentUserInfo } from "../../../../presentation/resolvers/auth/types";

export class FindCaseByIdQuery {
  constructor(public id: string, protected readonly currentUser?: CurrentUserInfo) {
    this.id = currentUser.userRole === UserRoles.CUSTOMER ? currentUser.applicationId : id;
  }
}
