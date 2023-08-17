import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Case, CaseConnection } from '../../entities/cases/case.entity';
import { CreateCaseInput } from '../../dto/cases/create-case.input';
import { UpdateCaseInput } from '../../dto/cases/update-case.input';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { MutationReturn } from 'src/presentation/common/entities/mutation-return-type';
import { CreateCaseCommand } from 'src/application/commands/cases/update-case/create-case.command';
import { UpdateCaseCommand } from 'src/application/commands/cases/create-case/update-case.command';
import { FindAllCasesQuery } from 'src/application/queries/cases/find-all-cases/find-all-casses.query';
import { FindCaseByIdQuery } from 'src/application/queries/cases/find-case-by-id/find-case-by-id.query';

@Resolver(() => Case)
export class CasesResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Mutation(() => MutationReturn)
  createCase(@Args('args') args: CreateCaseInput) {
    return this.commandBus.execute<CreateCaseCommand, Case>(
      new CreateCaseCommand(args),
    );
  }

  @Query(() => CaseConnection, { name: 'cases' })
  findAll() {
    return this.queryBus.execute<FindAllCasesQuery, Case>(
      new FindAllCasesQuery(),
    );
  }

  @Query(() => Case, { name: 'case' })
  findOneById(@Args('id') id: string) {
    return this.queryBus.execute<FindCaseByIdQuery, Case>(
      new FindCaseByIdQuery(id),
    );
  }

  @Mutation(() => MutationReturn)
  updateCase(@Args('args') args: UpdateCaseInput) {
    return this.commandBus.execute<UpdateCaseCommand, Case>(
      new UpdateCaseCommand(args),
    );
  }
}
