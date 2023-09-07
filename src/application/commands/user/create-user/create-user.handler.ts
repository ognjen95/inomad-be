import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from './create-user.command';

import { UserRoles } from 'src/domain/user/enums';

import { UserOnboardingService } from 'src/application/services/onboarding/user-onboarding.service';
import { MutationReturn } from 'src/application/common/return-dtos/mutation-return-dt0';

@CommandHandler(CreateUserCommand)
class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(private readonly onboardingService: UserOnboardingService) {}

  async execute({
    dto,
    currentUser,
  }: CreateUserCommand): Promise<MutationReturn> {
    console.log({ dto, currentUser });
    if (dto.userRole === UserRoles.CUSTOMER) {
      await this.onboardingService.onboardCustomer(dto);
    }

    if (
      (dto.userRole === UserRoles.PROVIDER_SUPERVISOR ||
        dto.userRole === UserRoles.PROVIDER_EMPLOYEE) &&
      currentUser.userRole === UserRoles.PROVIDER_SUPERVISOR
    ) {
      dto.companyId = currentUser.tenantId;
      await this.onboardingService.onboardProvider(dto);
    }

    return {
      isCompleted: true,
    };
  }
}

export default CreateUserHandler;
