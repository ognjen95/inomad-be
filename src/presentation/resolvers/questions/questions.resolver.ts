import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { QuestionEntity } from '../../entities/questions/question.entity';
import { CreateQuestionInput } from 'src/presentation/dto/questions/create-question.input';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateQuestionCommand } from 'src/application/commands/question/create-question/create-question.command';
import { Question } from 'src/domain/question/Question';
import { FindAllQuestionsQuery } from 'src/application/queries/questions/find-al-questions/find-all-questions.query';
import { QueryOptionsInput } from 'src/presentation/dto/common/query-options.dto';
import { QuestionEntityEdgesEntity } from 'src/presentation/entities/questions/question-edges.entity';

@Resolver(() => QuestionEntity)
export class QuestionResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Mutation(() => QuestionEntity)
  async createQuestion(
    @Args('createQuestionInput') createQuestionInput: CreateQuestionInput,
  ) {
    return await this.commandBus.execute<CreateQuestionCommand, Question>(
      new CreateQuestionCommand(createQuestionInput),
    );
  }

  @Query(() => QuestionEntityEdgesEntity, { name: 'findAllQuestion' })
  async findAll(
    @Args('QueryOptionsInput', { nullable: true })
    queryOptionsInput?: QueryOptionsInput,
  ) {
    return await this.queryBus.execute<FindAllQuestionsQuery, Question>(
      new FindAllQuestionsQuery(queryOptionsInput),
    );
  }

  // @Query(() => Question, { name: 'question' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.questionsService.findOne(id);
  // }

  // @Mutation(() => Question)
  // updateQuestion(
  //   @Args('updateQuestionInput') updateQuestionInput: UpdateQuestionInput,
  // ) {
  //   return this.questionsService.update(
  //     updateQuestionInput.id,
  //     updateQuestionInput,
  //   );
  // }

  // @Mutation(() => Question)
  // removeQuestion(@Args('id', { type: () => Int }) id: number) {
  //   return this.questionsService.remove(id);
  // }
}
