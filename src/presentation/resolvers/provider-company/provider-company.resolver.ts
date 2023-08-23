import {
  Resolver,
  Mutation,
  Args,
  ResolveField,
  Parent,
  Query,
} from '@nestjs/graphql';
import { CreateProviderCompanyInput } from '../../../domain/provider-company/dtos/create-provider-company.input';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateProviderCompanyCommand } from 'src/application/commands/provider-company/create-provider-company/provider-company.command';
import { MutationReturn } from 'src/presentation/common/entities/mutation-return-type';
import { ProviderCompany } from 'src/domain/provider-company/provider-company';
import { CaseConnection } from 'src/domain/case/case-connection';
import { FindAllCasesQuery } from 'src/application/queries/cases/find-all-cases/find-all-cases.query';
import { CaseEntity } from 'src/domain/case/case.entity';
import { FindProviderCompanyByIdQuery } from 'src/application/queries/provider-company/find-provider-company-by-id/find-provider-company-by-id.query';
import { ProviderCompanyEntity } from 'src/domain/provider-company/provider-company.entity';

@Resolver(() => ProviderCompanyEntity)
export class ProviderCompanyResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Mutation(() => MutationReturn)
  createProviderCompany(@Args('args') args: CreateProviderCompanyInput) {
    return this.commandBus.execute<
      CreateProviderCompanyCommand,
      ProviderCompany
    >(new CreateProviderCompanyCommand(args));
  }

  @Query(() => ProviderCompanyEntity, { name: 'providerCompany' })
  findOneById(@Args('id') id: string) {
    return this.queryBus.execute<FindProviderCompanyByIdQuery, ProviderCompany>(
      new FindProviderCompanyByIdQuery(id),
    );
  }

  @ResolveField(() => CaseConnection, { name: 'cases' })
  findAll(@Parent() providerCompany: ProviderCompany) {
    return this.queryBus.execute<FindAllCasesQuery, CaseEntity>(
      new FindAllCasesQuery({
        providerCompanyId: providerCompany.getId,
      }),
    );
  }
}
