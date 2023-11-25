import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateCaseWorkInfoCommand } from './update-work-info.command';
import { ICaseRepository } from '@application/common/interfaces/case/case-request-repository.interface';
import { Inject } from '@nestjs/common';
import {
  CASE_REPOSITORY_TOKEN,
  DOCUMENTS_REPOSITORY_TOKEN,
} from '@application/common/constants/tokens';
import { IDocumentRepository } from '@application/common/interfaces/documents/documents-repository.interface';
import { Document } from '@domain/documents/document';
import { DocumentType } from '@domain/documents/enums';

@CommandHandler(UpdateCaseWorkInfoCommand)
class UpdateCaseWorkInfoHandler
  implements ICommandHandler<UpdateCaseWorkInfoCommand>
{
  constructor(
    @Inject(CASE_REPOSITORY_TOKEN)
    private readonly caseRepository: ICaseRepository,

    @Inject(DOCUMENTS_REPOSITORY_TOKEN)
    private readonly documentsRepository: IDocumentRepository,
  ) {}

  async execute({ dto }: UpdateCaseWorkInfoCommand) {
    const foundCase = await this.caseRepository.findOneById(dto.id);

    if (!foundCase) throw new Error('Case not found');

    const currentlyUploadedCV = foundCase?.getWorkInfo?.cvFileId;
    const currentlyUploadedInvoices = foundCase?.getWorkInfo?.invoicesFilesIds;
    const currentlyUploadedContract = foundCase?.getWorkInfo?.contractFileId;

    foundCase.updateWorkInfo(dto);

    if (!!currentlyUploadedCV) {
      const existCVFile = await this.documentsRepository.findOneByFileId(
        currentlyUploadedCV,
      );

      existCVFile.setFileId = dto.cvFileId;

      await this.documentsRepository.update(existCVFile);
    } else {
      const documentName = `${foundCase.getGeneralInfo.firstName} ${foundCase.getGeneralInfo.lastName} CV`;
      const educationDiploma = new Document(documentName, DocumentType.CV);

      educationDiploma.setDocumentMetadata(
        dto.cvFileId,
        foundCase.getId,
        foundCase.getApplicantsIds[0],
        foundCase.getProviderCompanyId,
      );

      const document = await this.documentsRepository.create(educationDiploma);

      foundCase.setDocumentsIds = [document.getId];
    }

    if (!!currentlyUploadedInvoices.length) {
      const invoicesFile = await this.documentsRepository.findOneByFileId(
        currentlyUploadedInvoices[0],
      );

      invoicesFile.setFileId = dto.invoicesFilesIds[0] ?? '';

      await this.documentsRepository.update(invoicesFile);
    } else {
      const documentName = `${foundCase.getGeneralInfo.firstName} ${foundCase.getGeneralInfo.lastName} Invoice`;
      const invoice = new Document(documentName, DocumentType.INVOICES);

      invoice.setDocumentMetadata(
        dto.invoicesFilesIds[0],
        foundCase.getId,
        foundCase.getApplicantsIds[0],
        foundCase.getProviderCompanyId,
      );

      const document = await this.documentsRepository.create(invoice);

      foundCase.setDocumentsIds = [document.getId];
    }

    if (!!currentlyUploadedContract) {
      const contractFile = await this.documentsRepository.findOneByFileId(
        currentlyUploadedContract,
      );

      contractFile.setFileId = dto.contractFileId;

      await this.documentsRepository.update(contractFile);
    } else {
      const documentName = `${foundCase.getGeneralInfo.firstName} ${foundCase.getGeneralInfo.lastName} Contract`;
      const contract = new Document(
        documentName,
        DocumentType.EMPLOYMENT_CONTRACT,
      );

      contract.setDocumentMetadata(
        dto.contractFileId,
        foundCase.getId,
        foundCase.getApplicantsIds[0],
        foundCase.getProviderCompanyId,
      );

      const document = await this.documentsRepository.create(contract);

      foundCase.setDocumentsIds = [document.getId];
    }

    await this.caseRepository.update(foundCase);

    return {
      isCompleted: true,
    };
  }
}

export default UpdateCaseWorkInfoHandler;
