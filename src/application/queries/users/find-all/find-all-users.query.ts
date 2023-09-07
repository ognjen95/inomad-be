import { UserQueryOptionsInput } from 'src/domain/user/dtos/query-options.input';

export class FindAllUsersQuery {
  constructor(public readonly queryOptions: UserQueryOptionsInput) {}
}
