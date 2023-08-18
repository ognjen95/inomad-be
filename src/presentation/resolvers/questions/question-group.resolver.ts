import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateQuestionGroupInput } from 'src/domain/question/dtos/questions/create-question-group.input';
import { CreateQuestionGroupCommand } from 'src/application/commands/question/create-question-group/create-question-group.command';
import { QuestionGroupEntity } from 'src/domain/question/questions/question-group.entity';
import { QuestionGroup } from '@prisma/client';
import { FindAllQuestionGroupsQuery } from 'src/application/queries/questions/find-all-question-groups/find-all-question-groups.query';
import { QueryOptionsInput } from 'src/domain/common/query-options.dto';
import { QuestionGroupsEntityEdgesEntity } from 'src/domain/question/questions/question-groups-edges.entity';

@Resolver(() => QuestionGroupEntity)
export class QuestionGroupResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Mutation(() => QuestionGroupEntity)
  async createQuestionGroup(
    @Args('createQuestionGroupInput')
    createQuestionGroupInput: CreateQuestionGroupInput,
  ) {
    return await this.commandBus.execute<
      CreateQuestionGroupCommand,
      QuestionGroup
    >(new CreateQuestionGroupCommand(createQuestionGroupInput));
  }

  @Query(() => QuestionGroupsEntityEdgesEntity, {
    name: 'findAllQuestionGroups',
  })
  async findAll(
    @Args('QueryOptionsInput', { nullable: true })
    queryOptionsInput?: QueryOptionsInput,
  ) {
    return await this.queryBus.execute<
      FindAllQuestionGroupsQuery,
      QuestionGroup
    >(new FindAllQuestionGroupsQuery(queryOptionsInput));
  }
}
