import { QueryOptions } from 'src/domain/question/dtos/query-options.dto';

export class FindAllQuestionsQuery {
  constructor(public readonly queryOptions?: QueryOptions) {}
}
