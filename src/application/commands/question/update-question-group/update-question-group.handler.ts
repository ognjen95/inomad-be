import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateQuestionGroupCommand } from './update-question-group.command';
import { Inject, UnauthorizedException } from '@nestjs/common';
import {
  DOCUMENTS_REPOSITORY_TOKEN,
  QUESTION_GROUP_REPOSITORY_TOKEN,
} from '@application/common/constants/tokens';
import { QuestionGroup } from '@domain/question/question-group';
import { IQuestionGroupRepository } from '@application/common/interfaces/question/question-group-repository.interface';
import { UserRoles } from '@domain/user/enums';
import { IDocumentRepository } from '@application/common/interfaces/documents/documents-repository.interface';
import { QuestionType } from '@domain/question/questions/question.entity';
import { Document } from '@domain/documents/document';
import { plainToInstance } from 'class-transformer';

@CommandHandler(UpdateQuestionGroupCommand)
class UpdateQuestionGroupHandler
  implements ICommandHandler<UpdateQuestionGroupCommand>
{
  constructor(
    @Inject(QUESTION_GROUP_REPOSITORY_TOKEN)
    private readonly questionGroupRepository: IQuestionGroupRepository,
    @Inject(DOCUMENTS_REPOSITORY_TOKEN)
    private readonly documentRepostiory: IDocumentRepository,
  ) {}

  async execute({
    dto,
    currentUser,
  }: UpdateQuestionGroupCommand): Promise<QuestionGroup> {
    const questionGroups = await this.questionGroupRepository.findAll(
      {
        where: {
          id: {
            equals: dto.id,
          },
        },
      },
      currentUser,
    );

    const questionGroup = questionGroups[0];

    const mapped = questionGroup.getQuestions.map(async (question) => {
      const questionUpdateDto = dto.questions.find(
        (dtoQuestions) => dtoQuestions.id === question.getId,
      );

      if (questionUpdateDto) {
        const answers = questionUpdateDto.answers;

        const documentId = question.getDocumentId;

        const dtoDocumentExternalFileId = questionUpdateDto.documentId;

        if (
          documentId &&
          dtoDocumentExternalFileId &&
          documentId !== dtoDocumentExternalFileId &&
          question.getType === QuestionType.FILE
        ) {
          const doc = question.getDocument;

          doc.setFileId = dtoDocumentExternalFileId;

          question.setDocumentFileId = dtoDocumentExternalFileId;

          // TODO: Change to update many
          await this.documentRepostiory.update(plainToInstance(Document, doc));
        } else if (
          !documentId &&
          dtoDocumentExternalFileId &&
          question.getType === QuestionType.FILE
        ) {
          const doc = new Document(
            question.getDocumentName,
            question.getDocumentType,
          );

          doc.setProviderCompanyId = currentUser.tenantId;

          doc.setFileId = dtoDocumentExternalFileId;
          // TODO: Change to create many
          const createdDocument = await this.documentRepostiory.create(doc);

          question.setDocumentId = createdDocument.getId;

          question.setDocument = createdDocument;
        }

        question.setAnswers = answers;
      }

      return question;
    });

    const awaitedQuestions = await Promise.all(mapped);

    if (
      questionGroup.getProviderCompanyId !== currentUser.tenantId &&
      currentUser.userRole !== UserRoles.CUSTOMER
    ) {
      throw new UnauthorizedException(
        "You don't have permission to update this question group.",
      );
    }

    questionGroup.setQuestions = awaitedQuestions;

    return await this.questionGroupRepository.update(questionGroup);
  }
}

export default UpdateQuestionGroupHandler;
