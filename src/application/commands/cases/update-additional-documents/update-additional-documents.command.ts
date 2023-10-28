import { UpdateCaseAdditionalDocumentsInput } from 'src/domain/case/dtos/update-additional-documents.input';
import { CurrentUserInfo } from 'src/presentation/resolvers/auth/types';

export class UpdateCaseAdditionalDocumentsCommand {
  constructor(
    public readonly dto: UpdateCaseAdditionalDocumentsInput,
    public readonly currentUser?: CurrentUserInfo,
  ) {}
}
