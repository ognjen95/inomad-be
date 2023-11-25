import { Module } from '@nestjs/common';
import { PrismaModule } from '@infrastructure/prisma/prisma.module';
import { QuestionRepository } from '@infrastructure/repositories/question/question.repository';
import {
  DOCUMENTS_REPOSITORY_TOKEN,
  QUESTION_GROUP_REPOSITORY_TOKEN,
  QUESTION_REPOSITORY_TOKEN,
} from '@application/common/constants/tokens';
// import CreateQuestionHandler from '@application/commands/question/create-question/create-question.handler';
import FindAllQuestionsHandler from '@application/queries/questions/find-al-questions/find-all-questions.handler';
import { QuestionResolver } from '@presentation/resolvers/questions/questions.resolver';
import { CqrsModule } from '@nestjs/cqrs';
import UpdateQuestionHandler from '@application/commands/question/update-question/update-question.handler';
import { QuestionGroupRepository } from '@infrastructure/repositories/question/question-group.repository';
import { DocumentRepository } from '@infrastructure/repositories/document/document.repository';

@Module({
  imports: [CqrsModule],
  providers: [
    QuestionResolver,
    PrismaModule,
    QuestionRepository,
    {
      provide: QUESTION_REPOSITORY_TOKEN,
      useClass: QuestionRepository,
    },
    {
      provide: QUESTION_GROUP_REPOSITORY_TOKEN,
      useClass: QuestionGroupRepository,
    },
    {
      provide: DOCUMENTS_REPOSITORY_TOKEN,
      useClass: DocumentRepository,
    },
    // CreateQuestionHandler,
    FindAllQuestionsHandler,
    UpdateQuestionHandler,
  ],
})
export class QuestionsModule {}
