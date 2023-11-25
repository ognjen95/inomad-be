import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateQuestionGroupCommand } from './create-question-group.command';
import { Inject } from '@nestjs/common';
import { QUESTION_GROUP_REPOSITORY_TOKEN } from '@application/common/constants/tokens';
import { IQuestionGroupRepository } from '@application/common/interfaces/question/question-group-repository.interface';
import { Question } from '@domain/question/entity/question';
import { QuestionGroup } from '@domain/question/entity/question-group';

@CommandHandler(CreateQuestionGroupCommand)
class CreateQuestionGroupHandler
  implements ICommandHandler<CreateQuestionGroupCommand>
{
  constructor(
    @Inject(QUESTION_GROUP_REPOSITORY_TOKEN)
    private readonly questionGroupRepository: IQuestionGroupRepository,
  ) {}

  async execute({
    dto,
    currentUser,
  }: CreateQuestionGroupCommand): Promise<QuestionGroup> {
    const questions = dto.questions.map<Promise<Question>>(async (q) => {
      const question = new Question(
        q.text,
        q.options,
        q.points,
        q.testId,
        q.type,
        null,
        q.hasErrors,
        q.comments,
      );

      question.setIsExample = true;

      if (q.documentName && q.documentType) {
        question.setDocumentName = q.documentName;
        question.setDocumentType = q.documentType;
      }

      question.setProviderCompanyId = currentUser.tenantId;

      return question;
    });

    const awaitedQuestions = await Promise.all(questions);

    const newQuestionGroup = new QuestionGroup(dto.name);

    newQuestionGroup.setQuestions = awaitedQuestions;

    newQuestionGroup.setProviderCompanyId = currentUser.tenantId;

    return await this.questionGroupRepository.create(newQuestionGroup);
  }
}

export default CreateQuestionGroupHandler;
