import { Module } from '@nestjs/common';
import { TemplateResolver } from '../../resolvers/tests/tests.resolver';
import { CqrsModule } from '@nestjs/cqrs';
import { TestRepository } from '@infrastructure/repositories/tests/tests.repository';
import {
  QUESTION_GROUP_REPOSITORY_TOKEN,
  QUESTION_REPOSITORY_TOKEN,
  TEST_REPOSITORY_TOKEN,
} from '@application/common/constants/tokens';
import { QuestionRepository } from '@infrastructure/repositories/question/question.repository';
import FindAllTestsHandler from '@application/queries/tests/find-all-tests/find-all-tests.handler';
import FindTestByIdQueryHandler from '@application/queries/tests/fid-one-by-id/find-one-by-id.handler';
import UpdateTestHandler from '@application/commands/tests/update-text/update-test.handler';
import { QuestionGroupRepository } from '@infrastructure/repositories/question/question-group.repository';
import AssignTestToCaseHandler from '@application/commands/tests/create-test/assign-test-to-case.handler';
import CreateTestHandler from '@application/commands/tests/assign-test-to-case/create-test.handler';

@Module({
  imports: [CqrsModule],
  providers: [
    TemplateResolver,
    CreateTestHandler,
    TestRepository,
    QuestionRepository,
    FindAllTestsHandler,
    FindTestByIdQueryHandler,
    UpdateTestHandler,
    AssignTestToCaseHandler,
    {
      provide: TEST_REPOSITORY_TOKEN,
      useClass: TestRepository,
    },
    {
      provide: QUESTION_REPOSITORY_TOKEN,
      useClass: QuestionRepository,
    },
    {
      provide: QUESTION_GROUP_REPOSITORY_TOKEN,
      useClass: QuestionGroupRepository,
    },
  ],
})
export class TestsModule {}
