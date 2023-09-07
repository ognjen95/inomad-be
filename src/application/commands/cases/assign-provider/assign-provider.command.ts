import { UpdateCaseInput } from 'src/domain/case/dtos/update-case.input';
import { CurrentUserInfo } from 'src/presentation/resolvers/auth/types';

export class AssignProviderCommand {
  constructor(
    public readonly dto: UpdateCaseInput,
    public readonly currentUser: CurrentUserInfo,
  ) {}
}
