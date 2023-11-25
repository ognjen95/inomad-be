import { CurrentUserInfo } from '@presentation/resolvers/auth/types';

export class CreateCaseProposalCommand {
  constructor(
    public readonly user: CurrentUserInfo,
    public readonly caseId: string,
    public readonly price: number,
    public readonly deadline: Date,
  ) {}
}
