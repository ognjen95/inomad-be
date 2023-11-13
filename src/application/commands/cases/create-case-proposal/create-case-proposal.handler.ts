import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BadRequestException, Inject } from '@nestjs/common';
import {
  CASE_REPOSITORY_TOKEN,
  CASE_REQUEST_REPOSITORY_TOKEN,
  PROVIDER_REPOSITORY_TOKEN,
  USER_REPOSITORY_TOKEN,
} from 'src/application/common/constants/tokens';
import { CreateCaseProposalCommand } from './create-case-proposal.command';
import { ICaseRequestRepository } from 'src/application/common/interfaces/case/case-repository.interface';
import { CaseRequest } from 'src/domain/case-request/case-request';
import { IUserRepository } from 'src/application/common/interfaces/user/user-repository.interface';
import { ICaseRepository } from 'src/application/common/interfaces/case/case-request-repository.interface';
import { MutationReturn } from 'src/application/common/return-dtos/mutation-return-dt0';
import { UserRoles } from 'src/domain/user/enums';
import { IProviderCompanyRepository } from 'src/application/common/interfaces/provider-company/provider-company-repository.interface';

@CommandHandler(CreateCaseProposalCommand)
class CreateCaseProposalHandler
  implements ICommandHandler<CreateCaseProposalCommand>
{
  constructor(
    @Inject(CASE_REQUEST_REPOSITORY_TOKEN)
    private readonly caseRequestRepository: ICaseRequestRepository,

    @Inject(USER_REPOSITORY_TOKEN)
    private readonly useRepository: IUserRepository,

    @Inject(PROVIDER_REPOSITORY_TOKEN)
    private readonly providerCompany: IProviderCompanyRepository,

    @Inject(CASE_REPOSITORY_TOKEN)
    private readonly caseRepository: ICaseRepository,
  ) {}

  async execute({
    user,
    caseId,
    deadline,
    price,
  }: CreateCaseProposalCommand): Promise<MutationReturn> {
    const foundCase = await this.caseRepository.findOneById(caseId);

    if (!foundCase) {
      throw new BadRequestException('Case not found');
    }

    const applicantId = foundCase.getApplicantsIds[0];

    const caseRequest = new CaseRequest(applicantId, user.tenantId, caseId);

    caseRequest.setDeadline = deadline;
    caseRequest.setTotalCost = price;
    caseRequest.setIsProposal = true;

    await this.caseRequestRepository.create(caseRequest);

    return {
      isCompleted: true,
    };
  }
}

export default CreateCaseProposalHandler;
