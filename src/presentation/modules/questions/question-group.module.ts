import { Module } from '@nestjs/common';
import { PrismaModule } from '@infrastructure/prisma/prisma.module';
import {
  DOCUMENTS_REPOSITORY_TOKEN,
  QUESTION_GROUP_REPOSITORY_TOKEN,
  QUESTION_REPOSITORY_TOKEN,
} from '@application/common/constants/tokens';
import { CqrsModule } from '@nestjs/cqrs/dist/cqrs.module';
import { QuestionGroupRepository } from '@infrastructure/repositories/question/question-group.repository';
import { QuestionGroupResolver } from '@presentation/resolvers/questions/question-group.resolver';
import CreateQuestionGroupHandler from '@application/commands/question/create-question-group/create-question-group.handler';
import FindAllQuestionGroupsHandler from '@application/queries/questions/find-all-question-groups/find-all-question-groups.handler';
import { QuestionRepository } from '@infrastructure/repositories/question/question.repository';
import { DocumentRepository } from '@infrastructure/repositories/document/document.repository';
import UpdateQuestionGroupHandler from '@application/commands/question/update-question-group/update-question-group.handler';

@Module({
  imports: [CqrsModule],
  providers: [
    QuestionGroupResolver,
    PrismaModule,
    QuestionGroupRepository,
    {
      provide: QUESTION_GROUP_REPOSITORY_TOKEN,
      useClass: QuestionGroupRepository,
    },
    {
      provide: QUESTION_REPOSITORY_TOKEN,
      useClass: QuestionRepository,
    },
    {
      provide: DOCUMENTS_REPOSITORY_TOKEN,
      useClass: DocumentRepository,
    },
    CreateQuestionGroupHandler,
    FindAllQuestionGroupsHandler,
    UpdateQuestionGroupHandler,
  ],
})
export class QuestionGroupModule {}
