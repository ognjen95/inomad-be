import { UserQueryOptionsInput } from '@domain/user/dtos/query-options.input';

export class FindAllUsersQuery {
  constructor(public readonly queryOptions: UserQueryOptionsInput) {}
}
