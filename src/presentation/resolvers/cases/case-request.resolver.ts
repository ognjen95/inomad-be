import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CaseRequestEntity } from '../../../domain/case-request/case-request.entity';
import { CreateCaseRequestInput } from 'src/domain/case-request/dto/create-case-request.input';
import { UpdateCaseRequestInput } from 'src/domain/case-request/dto/update-case-request.input';
import { QueryBus } from '@nestjs/cqrs/dist/query-bus';
import { CommandBus } from '@nestjs/cqrs/dist/command-bus';
import { CreateCaseRequestCommand } from 'src/application/commands/cases/create-case request/create-case-request.command';
import { MutationReturn } from 'src/presentation/common/entities/mutation-return-type';
import { UpdateCaseRequestCommand } from 'src/application/commands/cases/update-case-request/update-case-request.command';

@Resolver(() => CaseRequestEntity)
export class CaseRequestResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Mutation(() => MutationReturn)
  createCaseRequest(
    @Args('args')
    args: CreateCaseRequestInput,
  ) {
    return this.commandBus.execute<CreateCaseRequestCommand, CaseRequestEntity>(
      new CreateCaseRequestCommand(args),
    );
  }

  @Query(() => [CaseRequestEntity], { name: 'caseRequest' })
  findAll() {
    // return this.caseRequestService.findAll();
  }

  @Query(() => CaseRequestEntity, { name: 'caseRequest' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    // return this.caseRequestService.findOne(id);
  }

  @Mutation(() => MutationReturn)
  updateCaseRequest(@Args('args') args: UpdateCaseRequestInput) {
    return this.commandBus.execute<UpdateCaseRequestCommand, CaseRequestEntity>(
      new UpdateCaseRequestCommand(args),
    );
  }

  @Mutation(() => CaseRequestEntity)
  removeCaseRequest(@Args('id', { type: () => Int }) id: number) {
    // return this.caseRequestService.remove(id);
  }
}
