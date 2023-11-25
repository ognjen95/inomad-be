import { CreateDocumentInput } from '@domain/documents/dto/create-document.input';
import { CurrentUserInfo } from '@presentation/resolvers/auth/types';

export class CreateDocumentCommand {
  constructor(
    public readonly dto: CreateDocumentInput,
    public readonly currentUser: CurrentUserInfo,
  ) {}
}
