import { UpdateCaseAdditionalDocumentsInput } from '@domain/case/dtos/update-additional-documents.input';
import { CurrentUserInfo } from '@presentation/resolvers/auth/types';

export class UpdateCaseAdditionalDocumentsCommand {
  constructor(
    public readonly dto: UpdateCaseAdditionalDocumentsInput,
    public readonly currentUser?: CurrentUserInfo,
  ) {}
}
