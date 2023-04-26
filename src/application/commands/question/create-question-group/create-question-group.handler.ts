import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateQuestionGroupCommand } from './create-question-group.command';
import { Inject } from '@nestjs/common';
import { QUESTION_GROUP_REPOSITORY_TOKEN } from 'src/application/common/constants/tokens';
import { QuestionGroup } from 'src/domain/question/QuestionGroup';
import { IQuestionGroupRepository } from 'src/application/common/interfaces/question/question-group-repository.interface';

@CommandHandler(CreateQuestionGroupCommand)
class CreateQuestionGroupHandler
  implements ICommandHandler<CreateQuestionGroupCommand>
{
  constructor(
    @Inject(QUESTION_GROUP_REPOSITORY_TOKEN)
    private readonly questionGroupRepository: IQuestionGroupRepository,
  ) {}

  async execute({ dto }: CreateQuestionGroupCommand): Promise<QuestionGroup> {
    const question = new QuestionGroup(dto.name);
    return await this.questionGroupRepository.create(question);
  }
}

export default CreateQuestionGroupHandler;
