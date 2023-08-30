import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from './create-user.command';
import { User } from 'src/domain/user/user';

import { UserRoles } from 'src/domain/user/enums';

import { UserOnboardingService } from 'src/application/services/onboarding/user-onboarding.service';
import { MutationReturn } from 'src/application/common/return-dtos/mutation-return-dt0';

@CommandHandler(CreateUserCommand)
class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(private readonly onboardingService: UserOnboardingService) {}

  async execute({ dto }: CreateUserCommand): Promise<MutationReturn> {
    if (dto.userRole === UserRoles.CUSTOMER) {
      return await this.onboardingService.onboardCustomer(dto);
    }

    if (
      dto.userRole === UserRoles.PROVIDER_SUPERVISOR ||
      dto.userRole === UserRoles.PROVIDER_EMPLOYEE
    ) {
      return await this.onboardingService.onboardProvider(dto);
    }
  }
}

export default CreateUserHandler;
