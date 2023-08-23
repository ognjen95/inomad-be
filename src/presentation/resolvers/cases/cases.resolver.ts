import { Resolver, Query, Mutation, Args, Parent } from '@nestjs/graphql';

import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { MutationReturn } from 'src/presentation/common/entities/mutation-return-type';
import { CreateCaseCommand } from 'src/application/commands/cases/create-case/create-case.command';
import { UpdateCaseCommand } from 'src/application/commands/cases/update-case/update-case.command';
import { FindAllCasesQuery } from 'src/application/queries/cases/find-all-cases/find-all-cases.query';
import { FindCaseByIdQuery } from 'src/application/queries/cases/find-case-by-id/find-case-by-id.query';
import { CreateCaseInput } from 'src/domain/case/dtos/create-case.input';
import { CaseConnection } from 'src/domain/case/case-connection';
import { UpdateCaseInput } from 'src/domain/case/dtos/update-case.input';
import { CaseEntity } from 'src/domain/case/case.entity';
import { FindAllCaseRequestsQuery } from 'src/application/queries/cases/find-all-case-requests/find-all-case-requests.query';
import { CaseRequest } from 'src/domain/case-request/case-request';
import { CaseRequestEntity } from 'src/domain/case-request/case-request.entity';
import { CaseRequestConnection } from 'src/domain/case-request/case-request-connection';
import { CaseQueryOptionsInput } from 'src/domain/case/dtos/query-options.input';

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

  @Query(() => CaseRequestConnection, { name: 'caseRequests' })
  findAllRequests(
    @Parent() parentCase: CaseRequest,
    @Args('options', { nullable: true }) options?: CaseQueryOptionsInput,
  ) {
    return this.queryBus.execute<FindAllCaseRequestsQuery, CaseRequestEntity>(
      new FindAllCaseRequestsQuery({
        caseId: parentCase.getId,
        ...options,
      }),
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
