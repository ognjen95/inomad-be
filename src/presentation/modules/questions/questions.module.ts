import { Module } from '@nestjs/common';
import { QuestionsService } from '../../../questions.service';
import { QuestionsResolver } from '../../resolvers/questions/questions.resolver';
import { PrismaModule } from 'src/infrastructure/prisma/prisma.module';
import { QuestionRepository } from 'src/infrastructure/repositories/question/question.repository';
import { QUESTION_REPOSITORY_TOKEN } from 'src/application/common/constants/tokens';
import CreateQuestionHandler from 'src/application/commands/question/create-question.handler';
import { CqrsModule } from '@nestjs/cqrs/dist/cqrs.module';
import FindAllQuestionsHandler from 'src/application/queries/questions/find-all-questions.handler';

@Module({
  imports: [CqrsModule],
  providers: [
    QuestionsResolver,
    QuestionsService,
    PrismaModule,
    QuestionRepository,
    {
      provide: QUESTION_REPOSITORY_TOKEN,
      useClass: QuestionRepository,
    },
    CreateQuestionHandler,
    FindAllQuestionsHandler,
  ],
})
export class QuestionsModule {}
