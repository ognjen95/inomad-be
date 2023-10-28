import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Inject, NotFoundException } from '@nestjs/common';
import {
  CASE_REPOSITORY_TOKEN,
  CASE_REQUEST_REPOSITORY_TOKEN,
  CHAT_SERVICE_TOKEN,
  USER_REPOSITORY_TOKEN,
} from 'src/application/common/constants/tokens';
import { UpdateCaseRequestCommand } from './update-case-request.command';
import { ICaseRequestRepository } from 'src/application/common/interfaces/case/case-repository.interface';
import { MutationReturn } from 'src/application/common/return-dtos/mutation-return-dt0';
import { IUserRepository } from 'src/application/common/interfaces/user/user-repository.interface';
import { ICaseRepository } from 'src/application/common/interfaces/case/case-request-repository.interface';
import { CaseStatus } from 'src/domain/case/enums';
import { CaseRequestStatus } from 'src/domain/case-request/enums';
import { IChatServiceInterface } from 'src/application/common/interfaces/chat/chat-service.interface';

@CommandHandler(UpdateCaseRequestCommand)
class UpdateCaseRequestHandler
  implements ICommandHandler<UpdateCaseRequestCommand>
{
  constructor(
    @Inject(CASE_REQUEST_REPOSITORY_TOKEN)
    private readonly caseRequestRepository: ICaseRequestRepository,

    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: IUserRepository,

    @Inject(CASE_REPOSITORY_TOKEN)
    private readonly caseRepository: ICaseRepository,

    @Inject(CHAT_SERVICE_TOKEN)
    private readonly chatService: IChatServiceInterface,
  ) {}

  async execute({
    userId,
    dto,
  }: UpdateCaseRequestCommand): Promise<MutationReturn> {
    const providerSupervisor = await this.userRepository.findOneById(userId);

    if (!providerSupervisor) {
      throw new NotFoundException('User not found');
    }

    const caseRequest = await this.caseRequestRepository.findOneById(dto.id);

    if (!caseRequest) {
      throw new NotFoundException('Case request not found');
    }

    caseRequest.updateCaseRequestStatus(providerSupervisor, dto.status);

    if (dto.status === CaseRequestStatus.APPROVED) {
      const caseForThisRequest = await this.caseRepository.findOneById(
        caseRequest.getCaseId,
      );

      if (!caseForThisRequest) {
        throw new NotFoundException('Case not found');
      }

      if (!caseForThisRequest.getProviderCompanyId) {
        caseForThisRequest.setProviderCompanyId =
          caseRequest.getProviderCompanyId;
      }

      // TODO: Update case status to pending if employee is assigned at this point
      // caseForThisRequest.setStatus = CaseStatus.PENDING;

      await this.chatService.createChat(
        caseForThisRequest.getName,
        [
          userId,
          ...caseForThisRequest.getApplicantsIds,
          ...caseForThisRequest.getProvidersIds,
        ],
        caseForThisRequest.getId,
      );

      await this.caseRepository.update(caseForThisRequest);
    }

    await this.caseRequestRepository.update(caseRequest);

    return {
      isCompleted: true,
    };
  }
}

export default UpdateCaseRequestHandler;
