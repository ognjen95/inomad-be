import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/infrastructure/prisma/prisma.module';
import { QuestionRepository } from 'src/infrastructure/repositories/question/question.repository';
import { QUESTION_REPOSITORY_TOKEN } from 'src/application/common/constants/tokens';
import CreateQuestionHandler from 'src/application/commands/question/create-question/create-question.handler';
import FindAllQuestionsHandler from 'src/application/queries/questions/find-al-questions/find-all-questions.handler';
import { QuestionResolver } from 'src/presentation/resolvers/questions/questions.resolver';
import { CqrsModule } from '@nestjs/cqrs';
import UpdateQuestionHandler from 'src/application/commands/question/update-question/update-question.handler';

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
    CreateQuestionHandler,
    FindAllQuestionsHandler,
    UpdateQuestionHandler,
  ],
})
export class QuestionsModule {}
