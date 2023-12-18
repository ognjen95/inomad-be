import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BadRequestException, Inject } from '@nestjs/common';
import {
  CASE_REPOSITORY_TOKEN,
  CASE_REQUEST_REPOSITORY_TOKEN,
  PROVIDER_REPOSITORY_TOKEN,
  USER_REPOSITORY_TOKEN,
} from '@application/common/constants/tokens';
import { CreateCaseRequestCommand } from './create-case-request.command';
import { ICaseRequestRepository } from '@application/common/interfaces/case/case-repository.interface';
import { CaseRequest } from '@domain/case-request/entity/case-request';
import { IUserRepository } from '@application/common/interfaces/user/user-repository.interface';
import { ICaseRepository } from '@application/common/interfaces/case/case-request-repository.interface';
import { MutationReturn } from '@application/common/return-dtos/mutation-return-dt0';
import { UserRoles } from '@domain/user/enums';
import { IProviderCompanyRepository } from '@application/common/interfaces/provider-company/provider-company-repository.interface';

@CommandHandler(CreateCaseRequestCommand)
class CreateCaseRequestHandler
  implements ICommandHandler<CreateCaseRequestCommand>
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
    userId,
    caseId,
    providerCompanyId,
  }: CreateCaseRequestCommand): Promise<MutationReturn> {
    const applicant = await this.useRepository.findOneById(userId);

    const caseRequests = await this.caseRequestRepository.findManyByApplicantId(
      {
        where: {
          applicantId: userId,
        },
      },
    );

    const alreadyApplied = caseRequests.some(
      (request) => request.getProviderCompanyId === providerCompanyId,
    );

    if (alreadyApplied) {
      throw new BadRequestException('You already applied for this case');
    }

    if (!applicant || applicant.getUserRole !== UserRoles.CUSTOMER) {
      throw new BadRequestException('You cannot create a case request');
    }

    const providerCompany = await this.providerCompany.findOneById(
      providerCompanyId,
    );

    if (!providerCompany) {
      throw new BadRequestException('Provider company do not accept new cases');
    }

    const caseExist = await this.caseRepository.findOneById(caseId);

    if (!caseExist || caseExist.getProviderCompanyId === providerCompanyId) {
      throw new BadRequestException("Can't create a case requests");
    }

    const caseRequest = new CaseRequest(userId, providerCompanyId, caseId);

    await this.caseRequestRepository.create(caseRequest);

    return {
      isCompleted: true,
    };
  }
}

export default CreateCaseRequestHandler;
