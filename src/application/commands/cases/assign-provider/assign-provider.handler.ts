import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AssignProviderCommand } from './assign-provider.command';
import { ICaseRepository } from 'src/application/common/interfaces/case/case-request-repository.interface';
import { Inject } from '@nestjs/common';
import { CASE_REPOSITORY_TOKEN } from 'src/application/common/constants/tokens';
import { UserRoles } from 'src/domain/user/enums';
import { CaseStatus } from 'src/domain/case/enums';

@CommandHandler(AssignProviderCommand)
class AssignProviderHandler implements ICommandHandler<AssignProviderCommand> {
  constructor(
    @Inject(CASE_REPOSITORY_TOKEN)
    private readonly caseRepository: ICaseRepository,
  ) {}

  async execute({ dto, currentUser }: AssignProviderCommand) {
    const foundCase = await this.caseRepository.findOneById(dto.id);

    if (!foundCase) {
      throw new Error('Case not found');
    }

    if (
      foundCase.getProviderCompanyId !== currentUser.tenantId ||
      currentUser.userRole !== UserRoles.PROVIDER_SUPERVISOR
    ) {
      throw new Error('You are not allowed to update this case');
    }

    foundCase.setProvidersIds = dto.providersIds;
    foundCase.setStatus = CaseStatus.PENDING;

    this.caseRepository.update(foundCase);

    return {
      isCompleted: true,
    };
  }
}

export default AssignProviderHandler;
