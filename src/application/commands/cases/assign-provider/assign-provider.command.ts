import { UpdateCaseInput } from '@domain/case/dtos/update-case.input';
import { CurrentUserInfo } from '@presentation/resolvers/auth/types';

export class AssignProviderCommand {
  constructor(
    public readonly dto: UpdateCaseInput,
    public readonly currentUser: CurrentUserInfo,
  ) {}
}
