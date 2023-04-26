import { QueryOptions } from 'src/application/common/dtos/query-options/query-options.dto';

export class FindAllTestsQuery {
  constructor(public readonly queryOptions: QueryOptions) {}
}
