import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TestEntity } from '../../../domain/test/test.entity';
import { CreateTestInput } from '../../../domain/test/dtos/tests/create-test.input';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Test } from 'src/domain/test/Test';
import { FindAllTestsQuery } from 'src/application/queries/tests/find-all-tests/find-all-tests.query';
import { FindTestByIdQuery } from 'src/application/queries/tests/fid-one-by-id/find-one-by-id.query';
import { UpdateTestInput } from 'src/domain/test/dtos/tests/update-test.input';
import { UpdateTestCommand } from 'src/application/commands/tests/update-text/update-test.command';
import { CurrentUser } from 'src/presentation/decorators/current-user';
import { CurrentUserInfo } from '../auth/types';
import { TestQueryOptionsInput } from 'src/domain/test/dtos/tests/test-query-options.input';
import { TemplateConnection } from 'src/domain/test/test.connection';
import { CreateTestCommand } from 'src/application/commands/tests/assign-test-to-case/create-test.command';
import { AssignTestToCaseCommand } from 'src/application/commands/tests/create-test/assign-test-to-case.command';

@Resolver(() => TestEntity)
export class TemplateResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Mutation(() => TestEntity)
  async createTemplate(
    @Args('args') createTestInput: CreateTestInput,
    @CurrentUser() user: CurrentUserInfo,
  ) {
    return await this.commandBus.execute<CreateTestCommand, Test>(
      new CreateTestCommand(createTestInput, user),
    );
  }

  @Mutation(() => TestEntity)
  async assignTemplate(
    @Args('templateId') templateId: string,
    @Args('caseId') caseId: string,
    @CurrentUser() user: CurrentUserInfo,
  ) {
    return await this.commandBus.execute<AssignTestToCaseCommand, Test>(
      new AssignTestToCaseCommand(templateId, caseId, user),
    );
  }

  @Mutation(() => TestEntity)
  async updateTest(@Args('args') updateTestInput: UpdateTestInput) {
    return await this.commandBus.execute<UpdateTestCommand, Test>(
      new UpdateTestCommand(updateTestInput),
    );
  }

  @Query(() => TemplateConnection, { name: 'templates' })
  async findAll(
    @CurrentUser() user: CurrentUserInfo,
    @Args('QueryOptionsInput', { nullable: true })
    queryOptionsInput?: TestQueryOptionsInput,
  ) {
    return await this.queryBus.execute<FindAllTestsQuery, Test>(
      new FindAllTestsQuery(user, queryOptionsInput),
    );
  }

  @Query(() => TestEntity, { name: 'findTestById' })
  async findOneById(@Args('id') id: string) {
    return await this.queryBus.execute<FindTestByIdQuery, Test>(
      new FindTestByIdQuery(id),
    );
  }
}
