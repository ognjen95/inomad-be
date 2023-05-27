import { QueryOptions } from 'src/domain/question/dtos/query-options.dto';

export class FindAllUsersQuery {
  constructor(public readonly queryOptions: QueryOptions) {}
}
