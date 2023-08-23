import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BadRequestException, Inject } from '@nestjs/common';
import {
  CASE_REQUEST_REPOSITORY_TOKEN,
  PROVIDER_REPOSITORY_TOKEN,
  USER_REPOSITORY_TOKEN,
} from 'src/application/common/constants/tokens';
import { CreateCaseRequestCommand } from './create-case-request.command';
import { ICaseRequestRepository } from 'src/application/common/interfaces/case/case-repository.interface';
import { CaseRequest } from 'src/domain/case-request/case-request';
import { IUserRepository } from 'src/application/common/interfaces/user/user-repository.interface';
import { ICaseRepository } from 'src/application/common/interfaces/case/case-request-repository.interface';
import { MutationReturn } from 'src/presentation/common/entities/mutation-return-type';
import { UserRoles } from 'src/domain/user/enums';

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
    private readonly providerCompany: ICaseRepository,
  ) {}

  async execute({ dto }: CreateCaseRequestCommand): Promise<MutationReturn> {
    const applicant = await this.useRepository.findOneById(dto.applicantId);

    if (!applicant || applicant.getUserRole !== UserRoles.CUSTOMER) {
      throw new BadRequestException('You cannot create a case request');
    }

    const providerCompany = await this.providerCompany.findOneById(
      dto.providerCompanyId,
    );

    if (!providerCompany) {
      throw new BadRequestException('Provider company do not accept new cases');
    }

    const caseRequest = new CaseRequest(
      dto.applicantId,
      dto.providerCompanyId,
      dto.caseId,
    );

    await this.caseRequestRepository.create(caseRequest);

    return {
      isCompleted: true,
    };
  }
}

export default CreateCaseRequestHandler;
