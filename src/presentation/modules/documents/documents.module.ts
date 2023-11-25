import { Module } from '@nestjs/common';
import { DocumentsResolver } from '../../resolvers/documents/documents.resolver';
import { FileService } from '@application/services/files/file-upload.service';
import { CqrsModule } from '@nestjs/cqrs';
import GetPresignedUrHandler from '@application/queries/documents/get-presigned-url/get-presigned-url.handler';
import {
  CASE_REPOSITORY_TOKEN,
  DOCUMENTS_REPOSITORY_TOKEN,
  FILE_SERVICE_TOKEN,
} from '@application/common/constants/tokens';
import { DocumentRepository } from '@infrastructure/repositories/document/document.repository';
import GetDownloadUrlHandler from '@application/queries/documents/get-download-url/get-download-url.handler';
import CreateDocumentHandler from '@application/commands/documents/create-document/create-document.handler';
import FindAllDocumentsHandler from '@application/queries/documents/find-all-documents/find-all-documents.handler';
import FindDocumentByIdHandler from '@application/queries/documents/find-document-by-id/find-document-by-id.handler';
import UpdateDocumentHandler from '@application/commands/documents/update-document/update-document.handler';
import UpdateCaseAdditionalDocumentHandler from '@application/commands/cases/update-additional-documents/update-additional-documents.handler';
import { CaseRepository } from '@infrastructure/repositories/case/case.repository';

@Module({
  imports: [CqrsModule],
  providers: [
    DocumentsResolver,
    FileService,
    {
      provide: FILE_SERVICE_TOKEN,
      useClass: FileService,
    },
    {
      provide: DOCUMENTS_REPOSITORY_TOKEN,
      useClass: DocumentRepository,
    },
    {
      provide: CASE_REPOSITORY_TOKEN,
      useClass: CaseRepository,
    },
    GetPresignedUrHandler,
    GetDownloadUrlHandler,
    CreateDocumentHandler,
    FindAllDocumentsHandler,
    FindDocumentByIdHandler,
    UpdateDocumentHandler,
    UpdateCaseAdditionalDocumentHandler,
  ],
})
export class DocumentsModule {}
