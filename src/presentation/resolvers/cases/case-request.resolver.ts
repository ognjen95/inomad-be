import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CaseRequestEntity } from '../../../domain/case-request/case-request.entity';
import { UpdateCaseRequestInput } from 'src/domain/case-request/dto/update-case-request.input';
import { QueryBus } from '@nestjs/cqrs/dist/query-bus';
import { CommandBus } from '@nestjs/cqrs/dist/command-bus';
import { CreateCaseRequestCommand } from 'src/application/commands/cases/create-case request/create-case-request.command';
import { MutationReturn } from 'src/application/common/return-dtos/mutation-return-dt0';
import { UpdateCaseRequestCommand } from 'src/application/commands/cases/update-case-request/update-case-request.command';
import { CurrentUser } from 'src/presentation/decorators/current-user';
import { CurrentUserInfo } from '../auth/types';
import { CreateCaseProposalCommand } from 'src/application/commands/cases/create-case-proposal/create-case-proposal.command';

@Resolver(() => CaseRequestEntity)
export class CaseRequestResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) { }

  @Mutation(() => MutationReturn)
  createCaseRequest(
    @CurrentUser() user: CurrentUserInfo,
    @Args('providerCompanyId') providerCompanyId: string,
  ) {
    console.log({ providerCompanyId });
    return this.commandBus.execute<CreateCaseRequestCommand, CaseRequestEntity>(
      new CreateCaseRequestCommand(
        user.userId,
        user.applicationId,
        providerCompanyId,
      ),
    );
  }

  @Mutation(() => MutationReturn)
  createCaseProposal(
    @CurrentUser() user: CurrentUserInfo,
    @Args('caseId') caseId: string,
    @Args('price') price: number,
    @Args('deadline') deadline: Date,
  ) {
    return this.commandBus.execute<
      CreateCaseProposalCommand,
      CaseRequestEntity
    >(new CreateCaseProposalCommand(user, caseId, price, deadline));
  }

  @Mutation(() => MutationReturn)
  updateCaseRequest(
    @CurrentUser() user: CurrentUserInfo,
    @Args('args') args: UpdateCaseRequestInput,
  ) {
    return this.commandBus.execute<UpdateCaseRequestCommand, CaseRequestEntity>(
      new UpdateCaseRequestCommand(user.userId, args),
    );
  }

  @Mutation(() => CaseRequestEntity)
  removeCaseRequest(@Args('id', { type: () => Int }) id: number) {
    // return this.caseRequestService.remove(id);
  }

  @Query(() => [CaseRequestEntity], { name: 'caseRequest' })
  findAll() {
    // return this.caseRequestService.findAll();
  }

  @Query(() => CaseRequestEntity, { name: 'caseRequest' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    // return this.caseRequestService.findOne(id);
  }
}
