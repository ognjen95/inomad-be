import { CurrentUserInfo } from '@presentation/resolvers/auth/types';

export class GetDownloadUrlQuery {
  constructor(
    public readonly id: string,
    public readonly user: CurrentUserInfo,
  ) {}
}
