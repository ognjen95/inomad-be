import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TestEntity } from '../../entities/tests/test.entity';
import { CreateTestInput } from '../../dto/tests/create-test.input';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateTestCommand } from 'src/application/commands/tests/create-test/create-test.command';
import { Test } from 'src/domain/test/Test';
import { QueryOptionsInput } from 'src/presentation/dto/common/query-options.dto';
import { FindAllTestsQuery } from 'src/application/queries/tests/find-all-tests/find-all-tests.query';
import { TestsEntityEdgesEntity } from 'src/presentation/entities/tests/tests-edges.entity';
import { FindTestByIdQuery } from 'src/application/queries/tests/fid-one-by-id/find-one-by-id.query';
import { UpdateTestInput } from 'src/presentation/dto/tests/update-test.input';
import { UpdateTestCommand } from 'src/application/commands/tests/update-text/update-test.command';

@Resolver(() => TestEntity)
export class TestsResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Mutation(() => TestEntity)
  async createTest(@Args('createTestInput') createTestInput: CreateTestInput) {
    return await this.commandBus.execute<CreateTestCommand, Test>(
      new CreateTestCommand(createTestInput),
    );
  }

  @Mutation(() => TestEntity)
  async updateTest(@Args('updateTestInput') updateTestInput: UpdateTestInput) {
    return await this.commandBus.execute<UpdateTestCommand, Test>(
      new UpdateTestCommand(updateTestInput),
    );
  }

  @Query(() => TestsEntityEdgesEntity, { name: 'findAllTests' })
  async findAll(
    @Args('QueryOptionsInput', { nullable: true })
    queryOptionsInput?: QueryOptionsInput,
  ) {
    return await this.queryBus.execute<FindAllTestsQuery, Test>(
      new FindAllTestsQuery(queryOptionsInput),
    );
  }

  @Query(() => TestEntity, { name: 'findTestById' })
  async findOneById(@Args('id') id: string) {
    return await this.queryBus.execute<FindTestByIdQuery, Test>(
      new FindTestByIdQuery(id),
    );
  }
}
