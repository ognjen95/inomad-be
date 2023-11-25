import { CurrentUserInfo } from '@presentation/resolvers/auth/types';

export class FindAllDocumentsQuery {
  constructor(public readonly currentUser: CurrentUserInfo) {}
}
