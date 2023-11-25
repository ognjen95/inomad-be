import { Document } from '@domain/documents/document';
import { DocumentQueryOptionsInput } from '@domain/documents/dto/document-query-options.input';

export interface IDocumentRepository {
  findOneById(
    id: string,
    options?: DocumentQueryOptionsInput,
  ): Promise<Document>;
  findMany(options?: DocumentQueryOptionsInput): Promise<Array<Document>>;
  findOneByFileId(id: string): Promise<Document>;
  create(dto: Document): Promise<Document>;
  update(dto: Document): Promise<Document>;
}
