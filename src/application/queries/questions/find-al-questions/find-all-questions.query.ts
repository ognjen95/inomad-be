import { QueryOptions } from 'src/application/common/dtos/query-options/query-options.dto';

export class FindAllQuestionsQuery {
  constructor(public readonly queryOptions?: QueryOptions) {}
}
