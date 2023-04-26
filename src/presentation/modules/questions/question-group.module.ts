import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/infrastructure/prisma/prisma.module';
import { QUESTION_GROUP_REPOSITORY_TOKEN } from 'src/application/common/constants/tokens';
import { CqrsModule } from '@nestjs/cqrs/dist/cqrs.module';
import { QuestionGroupRepository } from 'src/infrastructure/repositories/question/question-group.repository';
import { QuestionGroupResolver } from 'src/presentation/resolvers/questions/question-group.resolver';
import CreateQuestionGroupHandler from 'src/application/commands/question/create-question-group/create-question-group.handler';
import FindAllQuestionGroupsHandler from 'src/application/queries/questions/find-all-question-groups/find-all-question-groups.handler';

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
    CreateQuestionGroupHandler,
    FindAllQuestionGroupsHandler,
  ],
})
export class QuestionGroupModule {}
