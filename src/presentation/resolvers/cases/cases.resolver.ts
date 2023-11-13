import { Resolver, Query, Mutation, Args, Parent } from '@nestjs/graphql';

import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { MutationReturn } from 'src/application/common/return-dtos/mutation-return-dt0';
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
import { UpdateCaseGeneralInfoInput } from 'src/domain/case/dtos/update-case-general-info';
import { UpdateCaseGeneralInfoCommand } from 'src/application/commands/cases/update-general-info/update-general-info.command';
import { UpdateCaseEducationInfoInput } from 'src/domain/case/dtos/update-case-education-info';
import { UpdateCaseEducationInfoCommand } from 'src/application/commands/cases/update-education-info/update-education-info.command';
import { UpdateCaseWorkInfoInput } from 'src/domain/case/dtos/update-case-work-info';
import { UpdateCaseWorkInfoCommand } from 'src/application/commands/cases/update-work-info/update-work-info.command';
import { UpdateCaseFamilyInfoInput } from 'src/domain/case/dtos/update-family-info-input';
import { UpdateFamilyInfoCommand } from 'src/application/commands/cases/update-family-info/update-family-info.command';
import { UpdateCaseAdditionalDocumentsCommand } from 'src/application/commands/cases/update-additional-documents/update-additional-documents.command';
import { UpdateCaseAdditionalDocumentsInput } from 'src/domain/case/dtos/update-additional-documents.input';
import { CurrentUser } from 'src/presentation/decorators/current-user';
import { CurrentUserInfo } from '../auth/types';
import { AssignProviderCommand } from 'src/application/commands/cases/assign-provider/assign-provider.command';

@Resolver(() => CaseEntity)
export class CasesResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) { }

  @Mutation(() => MutationReturn)
  createCase(@Args('args') args: CreateCaseInput) {
    return this.commandBus.execute<CreateCaseCommand, CaseEntity>(
      new CreateCaseCommand(args),
    );
  }

  @Query(() => CaseConnection, { name: 'cases' })
  findAll(
    @CurrentUser() currentUser: CurrentUserInfo,
    @Args('options') options?: CaseQueryOptionsInput,
  ) {
    return this.queryBus.execute<FindAllCasesQuery, CaseEntity>(
      new FindAllCasesQuery(options ?? {}, currentUser),
    );
  }

  @Query(() => CaseConnection, { name: 'availableCases' })
  findAllAvailable() {
    return this.queryBus.execute<FindAllCasesQuery, CaseEntity>(
      new FindAllCasesQuery({ isAvailable: true }),
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

  @Mutation(() => MutationReturn)
  updateCaseGeneralInfo(@Args('args') args: UpdateCaseGeneralInfoInput) {
    return this.commandBus.execute<UpdateCaseGeneralInfoCommand, CaseEntity>(
      new UpdateCaseGeneralInfoCommand(args),
    );
  }

  @Mutation(() => MutationReturn)
  updateCaseEducationInfo(@Args('args') args: UpdateCaseEducationInfoInput) {
    return this.commandBus.execute<UpdateCaseEducationInfoCommand, CaseEntity>(
      new UpdateCaseEducationInfoCommand(args),
    );
  }

  @Mutation(() => MutationReturn)
  updateCaseWorkInfo(@Args('args') args: UpdateCaseWorkInfoInput) {
    return this.commandBus.execute<UpdateCaseWorkInfoCommand, CaseEntity>(
      new UpdateCaseWorkInfoCommand(args),
    );
  }

  @Mutation(() => MutationReturn)
  updateCaseFamilyInfo(@Args('args') args: UpdateCaseFamilyInfoInput) {
    return this.commandBus.execute<UpdateFamilyInfoCommand, CaseEntity>(
      new UpdateFamilyInfoCommand(args),
    );
  }

  @Mutation(() => MutationReturn)
  updateCaseAdditionalDocuments(
    @Args('args') args: UpdateCaseAdditionalDocumentsInput,
  ) {
    return this.commandBus.execute<
      UpdateCaseAdditionalDocumentsCommand,
      CaseEntity
    >(new UpdateCaseAdditionalDocumentsCommand(args));
  }

  @Mutation(() => MutationReturn)
  assignEmployeeToCase(
    @Args('args') args: UpdateCaseInput,
    @CurrentUser() currentUser: CurrentUserInfo,
  ) {
    return this.commandBus.execute<AssignProviderCommand, CaseEntity>(
      new AssignProviderCommand(args, currentUser),
    );
  }
}
