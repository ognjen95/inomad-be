import { CurrentUserInfo } from '@presentation/resolvers/auth/types';

export class AssignTestToCaseCommand {
  constructor(
    public readonly testId: string,
    public readonly caseId: string,
    public readonly currentUser: CurrentUserInfo,
  ) {}
}
