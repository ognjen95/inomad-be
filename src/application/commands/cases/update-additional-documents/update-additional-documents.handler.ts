import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ICaseRepository } from '@application/common/interfaces/case/case-request-repository.interface';
import { Inject } from '@nestjs/common';
import {
  CASE_REPOSITORY_TOKEN,
  DOCUMENTS_REPOSITORY_TOKEN,
} from '@application/common/constants/tokens';
import { IDocumentRepository } from '@application/common/interfaces/documents/documents-repository.interface';
import { Document } from '@domain/documents/document';
import { UpdateCaseAdditionalDocumentsCommand } from './update-additional-documents.command';

@CommandHandler(UpdateCaseAdditionalDocumentsCommand)
class UpdateCaseAdditionalDocumentHandler
  implements ICommandHandler<UpdateCaseAdditionalDocumentsCommand>
{
  constructor(
    @Inject(CASE_REPOSITORY_TOKEN)
    private readonly caseRepository: ICaseRepository,

    @Inject(DOCUMENTS_REPOSITORY_TOKEN)
    private readonly documentsRepository: IDocumentRepository,
  ) {}

  async execute({ dto }: UpdateCaseAdditionalDocumentsCommand) {
    const foundCase = await this.caseRepository.findOneById(dto.caseId);

    if (!foundCase) throw new Error('Case not found');

    const additionalDocuments = dto.additionalDocuments.map(async (doc) => {
      const existingDocument = foundCase?.getDocuments.find(
        (document) => document.getName === doc.name,
      );

      if (existingDocument) {
        existingDocument.setFileId = doc.fileId;

        await this.documentsRepository.update(existingDocument);
      } else {
        const newDocument = new Document(doc.name, doc.documentType);

        newDocument.setDocumentMetadata(
          doc.fileId,
          foundCase.getId,
          foundCase.getApplicantsIds[0],
          doc.providerCompanyId || foundCase.getProviderCompanyId,
        );

        await this.documentsRepository.create(newDocument);
      }
    });

    await Promise.all(additionalDocuments);

    return {
      isCompleted: true,
    };
  }
}

export default UpdateCaseAdditionalDocumentHandler;
