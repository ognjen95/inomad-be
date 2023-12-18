import { CaseStatus } from '../../../../domain/case/entity/enums';
import { CurrentUserInfo } from '../../../../presentation/resolvers/auth/types';

export class ChangeCaseStatusCommand {
  constructor(
    public readonly status: CaseStatus,
    public readonly caseId: string,
    public readonly currentUser: CurrentUserInfo,
  ) {}
}
