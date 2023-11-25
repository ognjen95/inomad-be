import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AssignProviderCommand } from './assign-provider.command';
import { ICaseRepository } from '@application/common/interfaces/case/case-request-repository.interface';
import { Inject } from '@nestjs/common';
import {
  CASE_REPOSITORY_TOKEN,
  CHAT_SERVICE_TOKEN,
} from '@application/common/constants/tokens';
import { UserRoles } from '@domain/user/enums';
import { CaseStatus } from '@domain/case/entity/enums';
import { IChatServiceInterface } from '@application/common/interfaces/chat/chat-service.interface';

@CommandHandler(AssignProviderCommand)
class AssignProviderHandler implements ICommandHandler<AssignProviderCommand> {
  constructor(
    @Inject(CASE_REPOSITORY_TOKEN)
    private readonly caseRepository: ICaseRepository,
    @Inject(CHAT_SERVICE_TOKEN)
    private readonly chatService: IChatServiceInterface,
  ) {}

  async execute({ dto, currentUser }: AssignProviderCommand) {
    const foundCase = await this.caseRepository.findOneById(dto.id);

    if (!foundCase) {
      throw new Error('Case not found');
    }

    // if (foundCase.getProvidersIds.length > 0) {
    //   throw new Error('Already assigned employee');
    // }

    if (
      foundCase.getProviderCompanyId !== currentUser.tenantId ||
      currentUser.userRole !== UserRoles.PROVIDER_SUPERVISOR
    ) {
      throw new Error('You are not allowed to update this case');
    }

    foundCase.setProvidersIds = dto.providersIds;
    foundCase.setStatus = CaseStatus.PENDING;

    await this.caseRepository.update(foundCase);

    await this.chatService.inviteUserToChat(dto.id, dto.providersIds);

    return {
      isCompleted: true,
    };
  }
}

export default AssignProviderHandler;
