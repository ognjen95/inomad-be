import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateQuestionCommand } from './create-question.command';
import { Question } from 'src/domain/question/Question';
import { IQuestionRepository } from 'src/application/common/interfaces/question/question-repository.interface';
import { Inject } from '@nestjs/common';
import { QUESTION_REPOSITORY_TOKEN } from 'src/application/common/constants/tokens';

@CommandHandler(CreateQuestionCommand)
class CreateQuestionHandler implements ICommandHandler<CreateQuestionCommand> {
  constructor(
    @Inject(QUESTION_REPOSITORY_TOKEN)
    private readonly questionRepository: IQuestionRepository,
  ) {}

  async execute({ dto }: CreateQuestionCommand): Promise<Question> {
    const { text, points, answers, questionGroup } = dto;
    const question = new Question(text, points, answers, questionGroup);

    question.isValid();

    return await this.questionRepository.create(question);
  }
}

export default CreateQuestionHandler;
