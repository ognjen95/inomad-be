import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Test } from '@domain/test/entity/Test';
import { ITestRepository } from '@application/common/interfaces/test/test-repository.interface';
import {
  QUESTION_GROUP_REPOSITORY_TOKEN,
  TEST_REPOSITORY_TOKEN,
} from '@application/common/constants/tokens';
import { Inject } from '@nestjs/common';
import { CreateTestCommand } from './create-test.command';
import { IQuestionGroupRepository } from '@application/common/interfaces/question/question-group-repository.interface';

@CommandHandler(CreateTestCommand)
class CreateTestHandler implements ICommandHandler<CreateTestCommand> {
  constructor(
    @Inject(TEST_REPOSITORY_TOKEN)
    private readonly testRepository: ITestRepository,
    @Inject(QUESTION_GROUP_REPOSITORY_TOKEN)
    private readonly questionGroupRepository: IQuestionGroupRepository,
  ) {}

  async execute({ dto, currentUser }: CreateTestCommand): Promise<Test> {
    const { name, questionGroupIds, percentageToPass, timeLimit } = dto;

    const test = new Test(name, questionGroupIds, percentageToPass, timeLimit);

    const questionGroups = await this.questionGroupRepository.findAll(
      {
        where: {
          id: {
            in: questionGroupIds,
          },
        },
      },
      currentUser,
    );

    test.setQuestionGroups = questionGroups;

    if (currentUser.tenantId) test.setProviderCompanyId = currentUser.tenantId;

    return this.testRepository.upsert(test);
  }
}

export default CreateTestHandler;
