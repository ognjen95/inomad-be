import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateCaseEducationInfoCommand } from './update-education-info.command';
import { ICaseRepository } from '@application/common/interfaces/case/case-request-repository.interface';
import { Inject } from '@nestjs/common';
import {
  CASE_REPOSITORY_TOKEN,
  DOCUMENTS_REPOSITORY_TOKEN,
} from '@application/common/constants/tokens';
import { IDocumentRepository } from '@application/common/interfaces/documents/documents-repository.interface';
import { Document } from '@domain/documents/document';
import { DocumentType } from '@domain/documents/enums';

@CommandHandler(UpdateCaseEducationInfoCommand)
class UpdateCaseEducationInfoHandler
  implements ICommandHandler<UpdateCaseEducationInfoCommand>
{
  constructor(
    @Inject(CASE_REPOSITORY_TOKEN)
    private readonly caseRepository: ICaseRepository,

    @Inject(DOCUMENTS_REPOSITORY_TOKEN)
    private readonly documentsRepository: IDocumentRepository,
  ) {}

  async execute({ dto }: UpdateCaseEducationInfoCommand) {
    const foundCase = await this.caseRepository.findOneById(dto.id);

    if (!foundCase) throw new Error('Case not found');

    const currentlyUploadedDiploma = foundCase?.getEducationInfo?.diplomaFileId;
    const currentlyUploadedConfirmationLetter =
      foundCase?.getEducationInfo?.confirmationLetterFileId;

    foundCase.updateEducationInfo(dto);

    if (Boolean(currentlyUploadedDiploma)) {
      const existDiplomaFile = await this.documentsRepository.findOneByFileId(
        currentlyUploadedDiploma,
      );

      existDiplomaFile.setFileId = dto.diplomaFileId;

      await this.documentsRepository.update(existDiplomaFile);
    } else {
      const documentName = `${foundCase.getGeneralInfo.firstName} ${foundCase.getGeneralInfo.lastName} Diploma`;
      const passportDocument = new Document(
        documentName,
        DocumentType.EDUCATION_DIPLOMA,
      );

      passportDocument.setDocumentMetadata(
        dto.diplomaFileId,
        foundCase.getId,
        foundCase.getApplicantsIds[0],
        foundCase.getProviderCompanyId,
      );

      const document = await this.documentsRepository.create(passportDocument);

      foundCase.setDocumentsIds = [document.getId];
    }

    if (Boolean(currentlyUploadedConfirmationLetter)) {
      const existConfirmationLetterFile =
        await this.documentsRepository.findOneByFileId(
          currentlyUploadedConfirmationLetter,
        );

      existConfirmationLetterFile.setFileId =
        dto.confirmationLetterFileId ?? '';

      await this.documentsRepository.update(existConfirmationLetterFile);
    } else {
      const documentName = `${foundCase.getGeneralInfo.firstName} ${foundCase.getGeneralInfo.lastName} Confirmation Letter`;
      const confirmationLetterDocument = new Document(
        documentName,
        DocumentType.EMPLOYMENT_CONFIRMATION_LETTER,
      );

      confirmationLetterDocument.setDocumentMetadata(
        dto.confirmationLetterFileId,
        foundCase.getId,
        foundCase.getApplicantsIds[0],
        foundCase.getProviderCompanyId,
      );

      const document = await this.documentsRepository.create(
        confirmationLetterDocument,
      );

      foundCase.setDocumentsIds = [document.getId];
    }

    await this.caseRepository.update(foundCase);

    return {
      isCompleted: true,
    };
  }
}

export default UpdateCaseEducationInfoHandler;
