import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from './create-user.command';

import { UserOnboardingService } from 'src/application/services/onboarding/user-onboarding.service';
import { MutationReturn } from 'src/application/common/return-dtos/mutation-return-dt0';

@CommandHandler(CreateUserCommand)
class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  constructor(private readonly onboardingService: UserOnboardingService) {}

  async execute({
    dto,
    isCustomer,
    isProviderSupervisor,
  }: CreateUserCommand): Promise<MutationReturn> {
    if (isCustomer) {
      await this.onboardingService.onboardCustomer(dto);
    }

    if (isProviderSupervisor) {
      await this.onboardingService.onboardProvider(dto);
    }

    return {
      isCompleted: true,
    };
  }
}

export default CreateUserHandler;
