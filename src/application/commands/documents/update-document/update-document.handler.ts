import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateDocumentCommand } from './update-document.command';
import { IDocumentRepository } from '@application/common/interfaces/documents/documents-repository.interface';
import { DOCUMENTS_REPOSITORY_TOKEN } from '@application/common/constants/tokens';
import { Inject } from '@nestjs/common';
import { UserRoles } from '@domain/user/enums';
import { MutationReturn } from '@application/common/return-dtos/mutation-return-dt0';

@CommandHandler(UpdateDocumentCommand)
class UpdateDocumentHandler implements ICommandHandler<UpdateDocumentCommand> {
  constructor(
    @Inject(DOCUMENTS_REPOSITORY_TOKEN)
    private readonly documentRepository: IDocumentRepository,
  ) {}

  async execute({
    dto,
    currentUser,
  }: UpdateDocumentCommand): Promise<MutationReturn> {
    const document = await this.documentRepository.findOneById(dto.id);
    document.setFileId = dto?.fileId;

    if (currentUser.userRole === UserRoles.CUSTOMER) {
      document.setCustomerId = currentUser.userId;
      document.setCaseId = currentUser.applicationId;
      document.setProviderCompanyId = dto?.providerCompanyId;
      // Check if there will be case when customer sets providerCompanyId
    }

    if (
      currentUser.userRole === UserRoles.PROVIDER_SUPERVISOR ||
      currentUser.userRole === UserRoles.PROVIDER_EMPLOYEE
    ) {
      document.setCaseId = dto?.caseId;
      document.setCustomerId = dto?.customerId;
      document.setProviderCompanyId = currentUser.tenantId;
    }

    await this.documentRepository.update(document);

    return {
      isCompleted: true,
    };
  }
}

export default UpdateDocumentHandler;
