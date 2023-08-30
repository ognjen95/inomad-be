import { CurrentUserInfo } from 'src/presentation/resolvers/auth/types';

export class FindAllDocumentsQuery {
  constructor(public readonly currentUser: CurrentUserInfo) {}
}
