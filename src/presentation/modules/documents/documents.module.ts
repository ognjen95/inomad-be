import { Module } from '@nestjs/common';
import { DocumentsResolver } from '../../resolvers/documents/documents.resolver';
import { FileService } from 'src/application/services/files/file-upload.service';
import { CqrsModule } from '@nestjs/cqrs';
import GetPresignedUrHandler from 'src/application/queries/documents/get-presigned-url/get-presigned-url.handler';
import {
  DOCUMENTS_REPOSITORY_TOKEN,
  FILE_SERVICE_TOKEN,
} from 'src/application/common/constants/tokens';
import { DocumentRepository } from 'src/infrastructure/repositories/document/document.repository';
import GetDownloadUrlHandler from 'src/application/queries/documents/get-download-url/get-download-url.handler';
import CreateDocumentHandler from 'src/application/commands/documents/create-document/create-document.handler';
import FindAllDocumentsHandler from 'src/application/queries/documents/find-all-documents/find-all-documents.handler';
import FindDocumentByIdHandler from 'src/application/queries/documents/find-document-by-id/find-document-by-id.handler';
import UpdateDocumentHandler from 'src/application/commands/documents/update-document/update-document.handler';

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
    GetPresignedUrHandler,
    GetDownloadUrlHandler,
    CreateDocumentHandler,
    FindAllDocumentsHandler,
    FindDocumentByIdHandler,
    UpdateDocumentHandler,
  ],
})
export class DocumentsModule {}
