import { QueryOptions } from 'src/domain/question/dtos/query-options.dto';

export class FindAllQuestionGroupsQuery {
  constructor(public readonly queryOptions?: QueryOptions) {}
}
