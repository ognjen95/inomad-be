import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateQuestionCommand } from './update-question.command';
import { IQuestionRepository } from '@application/common/interfaces/question/question-repository.interface';
import { QUESTION_REPOSITORY_TOKEN } from '@application/common/constants/tokens';
import { Inject } from '@nestjs/common';
import { Question } from '@domain/question/entity/question';

@CommandHandler(UpdateQuestionCommand)
class UpdateQuestionHandler implements ICommandHandler<UpdateQuestionCommand> {
  constructor(
    @Inject(QUESTION_REPOSITORY_TOKEN)
    private readonly questionRepository: IQuestionRepository,
  ) {}

  async execute({ dto }: UpdateQuestionCommand): Promise<Question> {
    const question = await this.questionRepository.findOneById(dto.id);

    return await this.questionRepository.update(dto.id, question);
  }
}

export default UpdateQuestionHandler;
