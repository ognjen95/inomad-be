import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateCustomerCommand } from './create-user.command';

import { UserOnboardingService } from '@application/services/onboarding/user-onboarding.service';
import { MutationReturn } from '@application/common/return-dtos/mutation-return-dt0';

@CommandHandler(CreateCustomerCommand)
class CreateCustomerHandler implements ICommandHandler<CreateCustomerCommand> {
  constructor(private readonly onboardingService: UserOnboardingService) {}

  async execute({ dto }: CreateCustomerCommand): Promise<MutationReturn> {
    await this.onboardingService.onboardCustomer(dto);

    return {
      isCompleted: true,
    };
  }
}

export default CreateCustomerHandler;
