import { QueryOptions } from 'src/domain/question/dtos/query-options.dto';

export class FindAllTestsQuery {
  constructor(public readonly queryOptions: QueryOptions) {}
}
