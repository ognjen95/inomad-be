import { DocumentEntity } from './document.entity';
import { DocumentType } from './enums';

export class Document extends DocumentEntity {
  constructor(name: string, documentType: DocumentType) {
    super();

    this.name = name;
    this.documentType = documentType;
  }

  setDocumentMetadata(
    fileId: string,
    caseId: string,
    customerId: string,
    providerCompanyId: string,
  ): void {
    this.fileId = fileId;
    this.caseId = caseId;
    this.customerId = customerId;
    this.providerCompanyId = providerCompanyId;
  }

  get getId(): string {
    return this.id;
  }

  set setId(id: string) {
    if (!id) return;
    this.id = id;
  }

  get getFileId(): string {
    return this.fileId;
  }

  set setFileId(fileId: string) {
    if (!fileId) return;

    this.fileId = fileId;
  }

  get getName(): string {
    return this.name;
  }

  set setName(name: string) {
    if (!name) return;
    this.name = name;
  }

  get getDocumentType(): DocumentType {
    return this.documentType;
  }

  set setDocumentType(documentType: DocumentType) {
    if (!documentType) return;
    this.documentType = documentType;
  }

  get getCreatedAt(): Date {
    return this.createdAt;
  }

  get getCustomerId(): string {
    return this.customerId;
  }

  set setCustomerId(customerId: string) {
    if (!customerId) return;

    if (this.customerId) return;
    this.customerId = customerId;
  }

  get getProviderCompanyId(): string {
    return this.providerCompanyId;
  }

  set setProviderCompanyId(providerCompanyId: string) {
    if (!providerCompanyId) return;

    if (this.providerCompanyId) {
      return;
    }

    this.providerCompanyId = providerCompanyId;
  }

  get getCaseId(): string {
    return this.caseId;
  }

  set setCaseId(caseId: string) {
    if (!caseId) return;

    if (this.caseId) return;

    this.caseId = caseId;
  }
}
