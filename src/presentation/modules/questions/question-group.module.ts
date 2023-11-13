import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/infrastructure/prisma/prisma.module';
import {
  DOCUMENTS_REPOSITORY_TOKEN,
  QUESTION_GROUP_REPOSITORY_TOKEN,
  QUESTION_REPOSITORY_TOKEN,
} from 'src/application/common/constants/tokens';
import { CqrsModule } from '@nestjs/cqrs/dist/cqrs.module';
import { QuestionGroupRepository } from 'src/infrastructure/repositories/question/question-group.repository';
import { QuestionGroupResolver } from 'src/presentation/resolvers/questions/question-group.resolver';
import CreateQuestionGroupHandler from 'src/application/commands/question/create-question-group/create-question-group.handler';
import FindAllQuestionGroupsHandler from 'src/application/queries/questions/find-all-question-groups/find-all-question-groups.handler';
import { QuestionRepository } from 'src/infrastructure/repositories/question/question.repository';
import { DocumentRepository } from 'src/infrastructure/repositories/document/document.repository';
import UpdateQuestionGroupHandler from 'src/application/commands/question/update-question-group/update-question-group.handler';

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
