import { Document } from 'src/domain/documents/document';
import { DocumentQueryOptionsInput } from 'src/domain/documents/dto/document-query-options.input';

export interface IDocumentRepository {
  findOneById(
    id: string,
    options?: DocumentQueryOptionsInput,
  ): Promise<Document>;
  findMany(options?: DocumentQueryOptionsInput): Promise<Array<Document>>;
  create(dto: Document): Promise<Document>;
  update(dto: Document): Promise<Document>;
}
