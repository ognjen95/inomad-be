import { CurrentUserInfo } from 'src/presentation/resolvers/auth/types';

export class FindDocumentByIdQuery {
  constructor(
    public readonly id: string,
    public readonly currentUser: CurrentUserInfo,
  ) {}
}
