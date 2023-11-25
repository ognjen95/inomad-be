import { UpdateDocumentInput } from '@domain/documents/dto/update-document.input';
import { CurrentUserInfo } from '@presentation/resolvers/auth/types';

export class UpdateDocumentCommand {
  constructor(
    public readonly dto: UpdateDocumentInput,
    public readonly currentUser: CurrentUserInfo,
  ) {}
}
