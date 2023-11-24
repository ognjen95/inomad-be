import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindAllQuestionGroupsQuery } from './find-all-question-groups.query';
import { Inject } from '@nestjs/common';
import { QUESTION_GROUP_REPOSITORY_TOKEN } from 'src/application/common/constants/tokens';
import { IQuestionGroupRepository } from 'src/application/common/interfaces/question/question-group-repository.interface';
import { QuestionGroup } from 'src/domain/question/question-group';

@QueryHandler(FindAllQuestionGroupsQuery)
class FindAllQuestionGroupsHandler
  implements IQueryHandler<FindAllQuestionGroupsQuery>
{
  constructor(
    @Inject(QUESTION_GROUP_REPOSITORY_TOKEN)
    private readonly questionGroupRepository: IQuestionGroupRepository,
  ) {}

  async execute({
    queryOptions,
    currentUser,
  }: FindAllQuestionGroupsQuery): Promise<Array<QuestionGroup>> {
    const questionGroups = await this.questionGroupRepository.findAll(
      queryOptions,
      currentUser,
    );

    console.log({ questionGroups });

    return questionGroups;
  }
}

export default FindAllQuestionGroupsHandler;
