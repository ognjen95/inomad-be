import { QueryOptions } from 'src/application/common/dtos/query-options/query-options.dto';

export class FindAllQuestionGroupsQuery {
  constructor(public readonly queryOptions?: QueryOptions) {}
}
