import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { MutationReturn } from 'src/presentation/common/entities/mutation-return-type';
import { CreateCaseCommand } from 'src/application/commands/cases/update-case/create-case.command';
import { UpdateCaseCommand } from 'src/application/commands/cases/create-case/update-case.command';
import { FindAllCasesQuery } from 'src/application/queries/cases/find-all-cases/find-all-casses.query';
import { FindCaseByIdQuery } from 'src/application/queries/cases/find-case-by-id/find-case-by-id.query';
import { CreateCaseInput } from 'src/domain/case/dtos/create-case.input';
import { CaseConnection } from 'src/domain/case/case-connection';
import { UpdateCaseInput } from 'src/domain/case/dtos/update-case.input';
import { CaseEntity } from 'src/domain/case/case.entity';

@Resolver(() => CaseEntity)
export class CasesResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Mutation(() => MutationReturn)
  createCase(@Args('args') args: CreateCaseInput) {
    return this.commandBus.execute<CreateCaseCommand, CaseEntity>(
      new CreateCaseCommand(args),
    );
  }

  @Query(() => CaseConnection, { name: 'cases' })
  findAll() {
    return this.queryBus.execute<FindAllCasesQuery, CaseEntity>(
      new FindAllCasesQuery(),
    );
  }

  @Query(() => CaseEntity, { name: 'case' })
  findOneById(@Args('id') id: string) {
    return this.queryBus.execute<FindCaseByIdQuery, CaseEntity>(
      new FindCaseByIdQuery(id),
    );
  }

  @Mutation(() => MutationReturn)
  updateCase(@Args('args') args: UpdateCaseInput) {
    return this.commandBus.execute<UpdateCaseCommand, CaseEntity>(
      new UpdateCaseCommand(args),
    );
  }
}
