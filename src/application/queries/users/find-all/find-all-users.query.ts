import { QueryOptions } from 'src/application/common/dtos/query-options/query-options.dto';

export class FindAllUsersQuery {
  constructor(public readonly queryOptions: QueryOptions) {}
}
