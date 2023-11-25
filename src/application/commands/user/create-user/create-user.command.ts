import { ICommand } from '@nestjs/cqrs';
import { CreateUserInput } from '@domain/user/dtos/create-user.input';
import { UserRoles } from '@domain/user/enums';
import { CurrentUserInfo } from '@presentation/resolvers/auth/types';

export class CreateUserCommand implements ICommand {
  public isCustomer = false;

  public isProviderSupervisor = false;

  constructor(
    public readonly dto: CreateUserInput,

    public readonly currentUser: CurrentUserInfo,
  ) {
    this.isCustomer = this.dto.userRole === UserRoles.CUSTOMER;

    if (
      (this.dto.userRole === UserRoles.PROVIDER_SUPERVISOR ||
        this.dto.userRole === UserRoles.PROVIDER_EMPLOYEE) &&
      this.currentUser.userRole === UserRoles.PROVIDER_SUPERVISOR
    ) {
      this.isProviderSupervisor = true;

      this.dto.companyId = this.currentUser.tenantId;
    }
  }
}
