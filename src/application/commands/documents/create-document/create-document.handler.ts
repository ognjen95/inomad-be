import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateDocumentCommand } from './create-document.command';
import { IDocumentRepository } from 'src/application/common/interfaces/documents/documents-repository.interface';
import { DOCUMENTS_REPOSITORY_TOKEN } from 'src/application/common/constants/tokens';
import { Inject } from '@nestjs/common';
import { Document } from 'src/domain/documents/document';
import { UserRoles } from 'src/domain/user/enums';
import { MutationReturn } from 'src/application/common/return-dtos/mutation-return-dt0';

@CommandHandler(CreateDocumentCommand)
class CreateDocumentHandler implements ICommandHandler<CreateDocumentCommand> {
  constructor(
    @Inject(DOCUMENTS_REPOSITORY_TOKEN)
    private readonly documentRepository: IDocumentRepository,
  ) {}

  async execute({
    dto,
    currentUser,
  }: CreateDocumentCommand): Promise<MutationReturn> {
    const document = new Document(dto.name, dto.documentType);
    document.setFileId = dto.fileId;

    if (currentUser.userRole === UserRoles.CUSTOMER) {
      document.setCustomerId = currentUser.userId;
      document.setCaseId = currentUser.applicationId;
      document.setProviderCompanyId = dto.providerCompanyId;
      // Check if there will be case when customer sets providerCompanyId
    }

    if (
      currentUser.userRole === UserRoles.PROVIDER_SUPERVISOR ||
      currentUser.userRole === UserRoles.PROVIDER_EMPLOYEE
    ) {
      document.setCaseId = dto.caseId;
      document.setCustomerId = dto.customerId;
      document.setProviderCompanyId = currentUser.tenantId;
    }

    await this.documentRepository.create(document);

    return {
      isCompleted: true,
    };
  }
}

export default CreateDocumentHandler;
