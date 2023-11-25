import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '@infrastructure/prisma/prisma.service';
import { DocumentType } from '@prisma/client';
import { plainToInstance } from 'class-transformer';
import { IDocumentRepository } from '@application/common/interfaces/documents/documents-repository.interface';
import { Document } from '@domain/documents/document';
import { DocumentQueryOptionsInput } from '@domain/documents/dto/document-query-options.input';

@Injectable()
export class DocumentRepository implements IDocumentRepository {
  private readonly caseSensitive = 'insensitive';

  @Inject()
  protected readonly db: PrismaService;

  async create(dto: Document): Promise<Document> {
    const createdDocument = await this.db.documents.create({
      data: {
        name: dto?.getName,
        documentType: dto?.getDocumentType as DocumentType,
        fileId: dto?.getFileId,
        caseId: dto?.getCaseId,
        providerCompanyId: dto?.getProviderCompanyId,
        customerId: dto?.getCustomerId,
      },
    });

    return plainToInstance(Document, createdDocument);
  }

  async update(dto: Document): Promise<Document> {
    const updatedDocument = await this.db.documents.update({
      where: {
        id: dto.getId,
      },
      data: {
        name: dto?.getName,
        documentType: dto?.getDocumentType as DocumentType,
        fileId: dto?.getFileId,
        caseId: dto?.getCaseId,
        providerCompanyId: dto?.getProviderCompanyId,
        customerId: dto?.getCustomerId,
      },
    });

    return plainToInstance(Document, updatedDocument);
  }

  async findOneById(
    id: string,
    options?: DocumentQueryOptionsInput,
  ): Promise<Document> {
    const foundDocument = await this.db.documents.findFirst({
      where: {
        id,
        ...(options?.caseId && {
          caseId: options.caseId,
        }),
        ...(options?.customerId && {
          customerId: options.customerId,
        }),
        ...(options?.providerCompanyId && {
          providerCompanyId: options.providerCompanyId,
        }),
        ...(options?.fileId && {
          fileId: options.fileId,
        }),
      },
    });

    return plainToInstance(Document, foundDocument);
  }

  async findOneByFileId(id: string): Promise<Document> {
    const foundDocument = await this.db.documents.findFirst({
      where: {
        fileId: id,
      },
    });

    return plainToInstance(Document, foundDocument);
  }

  async findMany(options: DocumentQueryOptionsInput): Promise<Array<Document>> {
    const foundDocuments = await this.db.documents.findMany({
      where: {
        customerId: options.customerId ?? undefined,
        providerCompanyId: options.providerCompanyId ?? undefined,
        caseId: options.caseId ?? undefined,
        fileId: options.fileId ?? undefined,
      },
    });

    return plainToInstance(Document, foundDocuments);
  }
}
