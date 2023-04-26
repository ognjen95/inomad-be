import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateTestCommand } from './create-test.command';
import { Test } from 'src/domain/test/Test';
import { ITestRepository } from 'src/application/common/interfaces/test/test-repository.interface';
import {
  QUESTION_REPOSITORY_TOKEN,
  TEST_REPOSITORY_TOKEN,
} from 'src/application/common/constants/tokens';
import { Inject } from '@nestjs/common';
import { IQuestionRepository } from 'src/application/common/interfaces/question/question-repository.interface';

@CommandHandler(CreateTestCommand)
class CreateTestHandler implements ICommandHandler<CreateTestCommand> {
  constructor(
    @Inject(TEST_REPOSITORY_TOKEN)
    private readonly testRepository: ITestRepository,
    @Inject(QUESTION_REPOSITORY_TOKEN)
    private readonly questionRepository: IQuestionRepository,
  ) {}

  async execute({ dto }: CreateTestCommand): Promise<Test> {
    const { name, questionIds, percentageToPass, timeLimit } = dto;
    const test = new Test(name, percentageToPass, timeLimit);
    const questions = await this.questionRepository.findAllByIds(questionIds);

    test.setQuestions = questions;

    return await this.testRepository.create(test);
  }
}

export default CreateTestHandler;
