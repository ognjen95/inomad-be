import { Module } from '@nestjs/common';
import { TestsService } from '../../../tests.service';
import { TestsResolver } from '../../resolvers/tests/tests.resolver';
import { CqrsModule } from '@nestjs/cqrs';
import CreateTestHandler from 'src/application/commands/tests/create-test/create-test.handler';
import { TestRepository } from 'src/infrastructure/repositories/tests/tests.repository';
import {
  QUESTION_REPOSITORY_TOKEN,
  TEST_REPOSITORY_TOKEN,
} from 'src/application/common/constants/tokens';
import { QuestionRepository } from 'src/infrastructure/repositories/question/question.repository';
import FindAllTestsHandler from 'src/application/queries/tests/find-all-tests/find-all-tests.handler';
import FindTestByIdQueryHandler from 'src/application/queries/tests/fid-one-by-id/find-one-by-id.handler';
import UpdateTestHandler from 'src/application/commands/tests/update-text/update-test.handler';

@Module({
  imports: [CqrsModule],
  providers: [
    TestsResolver,
    TestsService,
    CreateTestHandler,
    TestRepository,
    QuestionRepository,
    FindAllTestsHandler,
    FindTestByIdQueryHandler,
    UpdateTestHandler,
    {
      provide: TEST_REPOSITORY_TOKEN,
      useClass: TestRepository,
    },
    {
      provide: QUESTION_REPOSITORY_TOKEN,
      useClass: QuestionRepository,
    },
  ],
})
export class TestsModule {}
