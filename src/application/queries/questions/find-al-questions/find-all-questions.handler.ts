import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindAllQuestionsQuery } from './find-all-questions.query';
import { IQuestionRepository } from 'src/application/common/interfaces/question/question-repository.interface';
import { Inject } from '@nestjs/common';
import { QUESTION_REPOSITORY_TOKEN } from 'src/application/common/constants/tokens';
import { Question } from 'src/domain/question/question';
import { EdgesResponse } from 'src/application/common/types/query-return.type';

@QueryHandler(FindAllQuestionsQuery)
class FindAllQuestionsHandler implements IQueryHandler<FindAllQuestionsQuery> {
  constructor(
    @Inject(QUESTION_REPOSITORY_TOKEN)
    private readonly questionsRepository: IQuestionRepository,
  ) {}

  async execute({
    queryOptions,
  }: FindAllQuestionsQuery): Promise<EdgesResponse<Question>> {
    return await this.questionsRepository.findAll(queryOptions);
  }
}

export default FindAllQuestionsHandler;
