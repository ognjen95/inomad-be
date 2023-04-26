import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TestEntity } from '../../entities/tests/test.entity';
import { CreateTestInput } from '../../dto/tests/create-test.input';
import { UpdateTestInput } from '../../dto/tests/update-test.input';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateTestCommand } from 'src/application/commands/tests/create-test/create-test.command';
import { Test } from 'src/domain/test/Test';
import { QueryOptionsInput } from 'src/presentation/dto/common/query-options.dto';
import { FindAllTestsQuery } from 'src/application/queries/tests/find-all-tests/find-all-tests.query';
import { TestsEntityEdgesEntity } from 'src/presentation/entities/tests/tests-edges.entity';

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

  @Query(() => TestsEntityEdgesEntity, { name: 'findAllTests' })
  async findAll(
    @Args('QueryOptionsInput', { nullable: true })
    queryOptionsInput?: QueryOptionsInput,
  ) {
    return await this.queryBus.execute<FindAllTestsQuery, Test>(
      new FindAllTestsQuery(queryOptionsInput),
    );
  }
}
