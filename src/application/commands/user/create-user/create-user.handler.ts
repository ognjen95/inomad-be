import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from './create-user.command';
import { User } from 'src/domain/user/user';

import { UserRoles } from 'src/domain/user/enums';

import { UserOnboardingService } from 'src/application/services/onboarding/user-onboarding.service';
import { MutationReturn } from 'src/presentation/common/entities/mutation-return-type';

@CommandHandler(CreateUserCommand)
class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(private readonly onboardingService: UserOnboardingService) {}

  async execute({ dto }: CreateUserCommand): Promise<MutationReturn> {
    const user = new User(
      dto.firstName,
      dto.middleName,
      dto.lastName,
      dto.email,
      dto.password,
      dto.userRole,
    );

    if (user.getUserRole === UserRoles.CUSTOMER) {
      return await this.onboardingService.onboardCustomer(user);
    }

    if (
      user.getUserRole === UserRoles.PROVIDER_SUPERVISOR ||
      user.getUserRole === UserRoles.PROVIDER_EMPLOYEE
    ) {
      user.setProviderCompanyId = dto.companyId;

      return await this.onboardingService.onboardProvider(user);
    }
  }
}

export default CreateUserHandler;
