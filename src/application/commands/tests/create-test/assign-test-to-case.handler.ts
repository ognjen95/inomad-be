import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AssignTestToCaseCommand } from './assign-test-to-case.command';
import { Test } from 'src/domain/test/Test';
import { ITestRepository } from 'src/application/common/interfaces/test/test-repository.interface';
import {
  QUESTION_GROUP_REPOSITORY_TOKEN,
  TEST_REPOSITORY_TOKEN,
} from 'src/application/common/constants/tokens';
import { Inject } from '@nestjs/common';
import { IQuestionGroupRepository } from 'src/application/common/interfaces/question/question-group-repository.interface';

@CommandHandler(AssignTestToCaseCommand)
class AssignTestToCaseHandler
  implements ICommandHandler<AssignTestToCaseCommand>
{
  constructor(
    @Inject(TEST_REPOSITORY_TOKEN)
    private readonly testRepository: ITestRepository,
    @Inject(QUESTION_GROUP_REPOSITORY_TOKEN)
    private readonly questionGroupRepository: IQuestionGroupRepository,
  ) {}

  async execute({
    testId,
    caseId,
    currentUser,
  }: AssignTestToCaseCommand): Promise<Test> {
    const tests = await this.testRepository.findAll({
      id: testId,
    });

    const test = tests[0];

    test.setId = undefined;

    test.setCaseId = caseId;

    const questQRPS = await this.questionGroupRepository.findAll(
      {
        where: {
          id: {
            in: test.getQuestionGroupIds,
          },
        },
      },
      currentUser,
    );

    const awaitQuestionGroups = await Promise.all(questQRPS);

    test.setQuestionGroups = awaitQuestionGroups;

    test.setQuestionGroupIds = awaitQuestionGroups.map((qg) => qg.getId);

    return await this.testRepository.copayAndAssignTemplate(test);
  }
}

export default AssignTestToCaseHandler;
