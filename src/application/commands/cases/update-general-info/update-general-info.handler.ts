import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateCaseGeneralInfoCommand } from './update-general-info.command';
import { ICaseRepository } from '@application/common/interfaces/case/case-request-repository.interface';
import { Inject } from '@nestjs/common';
import {
  CASE_REPOSITORY_TOKEN,
  DOCUMENTS_REPOSITORY_TOKEN,
} from '@application/common/constants/tokens';
import { IDocumentRepository } from '@application/common/interfaces/documents/documents-repository.interface';
import { Document } from '@domain/documents/document';
import { DocumentType } from '@domain/documents/enums';

@CommandHandler(UpdateCaseGeneralInfoCommand)
class UpdateCaseGeneralInfoHandler
  implements ICommandHandler<UpdateCaseGeneralInfoCommand>
{
  constructor(
    @Inject(CASE_REPOSITORY_TOKEN)
    private readonly caseRepository: ICaseRepository,

    @Inject(DOCUMENTS_REPOSITORY_TOKEN)
    private readonly documentsRepository: IDocumentRepository,
  ) {}

  async execute({ dto }: UpdateCaseGeneralInfoCommand) {
    const foundCase = await this.caseRepository.findOneById(dto.id);

    if (!foundCase) throw new Error('Case not found');

    const currentlyUploadedPassport = foundCase?.getGeneralInfo?.passportFileId;

    foundCase.updateGeneralInfo(dto);

    if (!!currentlyUploadedPassport) {
      const passport = await this.documentsRepository.findOneByFileId(
        currentlyUploadedPassport,
      );

      passport.setFileId = dto.passportFileId;

      await this.documentsRepository.update(passport);
    } else {
      const documentName = `${foundCase.getGeneralInfo.firstName} ${foundCase.getGeneralInfo.lastName} Passport`;
      const passportDocument = new Document(
        documentName,
        DocumentType.PASSPORT,
      );

      passportDocument.setDocumentMetadata(
        dto.passportFileId,
        foundCase.getId,
        foundCase.getApplicantsIds[0],
        foundCase.getProviderCompanyId,
      );

      const document = await this.documentsRepository.create(passportDocument);

      foundCase.setDocumentsIds = [document.getId];
    }

    await this.caseRepository.update(foundCase);

    return {
      isCompleted: true,
    };
  }
}

export default UpdateCaseGeneralInfoHandler;
