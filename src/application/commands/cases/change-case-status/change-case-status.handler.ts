import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ChangeCaseStatusCommand } from './change-case-status.command';
import { ICaseRepository } from '@application/common/interfaces/case/case-request-repository.interface';
import {
  BadRequestException,
  Inject,
  UnauthorizedException,
} from '@nestjs/common';
import { CASE_REPOSITORY_TOKEN } from '@application/common/constants/tokens';
import { UserRoles } from '../../../../domain/user/enums';

@CommandHandler(ChangeCaseStatusCommand)
class ChangeCaseStatusHandler
  implements ICommandHandler<ChangeCaseStatusCommand>
{
  constructor(
    @Inject(CASE_REPOSITORY_TOKEN)
    private readonly caseRepository: ICaseRepository,
  ) { }

  async execute({ status, caseId, currentUser }: ChangeCaseStatusCommand) {
    const foundCase = await this.caseRepository.findOneById(caseId);

    if (!foundCase) {
      throw new BadRequestException();
    }

    if (
      currentUser.userRole !== UserRoles.PROVIDER_SUPERVISOR &&
      currentUser.userRole !== UserRoles.PROVIDER_EMPLOYEE
    ) {
      throw new UnauthorizedException();
    }

    if (foundCase.getProviderCompanyId !== currentUser.tenantId) {
      throw new UnauthorizedException();
    }

    foundCase.setStatus = status;

    await this.caseRepository.update(foundCase);

    return {
      isCompleted: true,
    };
  }
}

export default ChangeCaseStatusHandler;
