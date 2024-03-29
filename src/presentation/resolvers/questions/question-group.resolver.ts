import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateQuestionGroupInput } from '@domain/question/dtos/create-question-group.input';
import { CreateQuestionGroupCommand } from '@application/commands/question/create-question-group/create-question-group.command';
import { QuestionGroupEntity } from '@domain/question/questions/question-group.entity';
import { QuestionGroup } from '@prisma/client';
import { FindAllQuestionGroupsQuery } from '@application/queries/questions/find-all-question-groups/find-all-question-groups.query';
import { CurrentUser } from '@presentation/decorators/current-user';
import { CurrentUserInfo } from '../auth/types';
import { QuestionGroupOptionsInput } from '@domain/question/dtos/question-group-query-options.input';
import { connectionFromArray } from 'graphql-relay';
import { QuestionGroupConnection } from '@domain/question/questions/question-groups-edges.entity';
import { UpdateQuestionGroupInput } from '@domain/question/dtos/update-question-group.input';
import { UpdateQuestionGroupCommand } from '@application/commands/question/update-question-group/update-question-group.command';

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
    @CurrentUser() user: CurrentUserInfo,
  ) {
    return await this.commandBus.execute<
      CreateQuestionGroupCommand,
      QuestionGroup
    >(new CreateQuestionGroupCommand(createQuestionGroupInput, user));
  }

  @Mutation(() => QuestionGroupEntity)
  async updateQuestionGroup(
    @Args('args')
    args: UpdateQuestionGroupInput,
    @CurrentUser() user: CurrentUserInfo,
  ) {
    return await this.commandBus.execute<
      UpdateQuestionGroupCommand,
      QuestionGroup
    >(new UpdateQuestionGroupCommand(args, user));
  }

  @Query(() => QuestionGroupConnection, {
    name: 'questionGroups',
  })
  async findAll(
    @CurrentUser() user: CurrentUserInfo,
    @Args('args', { nullable: true })
    args?: QuestionGroupOptionsInput,
  ) {
    const questionGroups = await this.queryBus.execute<
      FindAllQuestionGroupsQuery,
      QuestionGroupEntity[]
    >(new FindAllQuestionGroupsQuery(user, { ...args }));

    return connectionFromArray(questionGroups, {});
  }
}
