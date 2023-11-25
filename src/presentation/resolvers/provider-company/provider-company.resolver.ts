import { Resolver, Mutation, Args, ResolveField, Query } from '@nestjs/graphql';
import { CreateProviderCompanyInput } from '@domain/provider-company/dtos/create-provider-company.input';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateProviderCompanyCommand } from '@application/commands/provider-company/create-provider-company/provider-company.command';
import { MutationReturn } from '@application/common/return-dtos/mutation-return-dt0';
import { ProviderCompany } from '@domain/provider-company/entity/provider-company';
import { FindAllCasesQuery } from '@application/queries/cases/find-all-cases/find-all-cases.query';
import { FindProviderCompanyByIdQuery } from '@application/queries/provider-company/find-provider-company-by-id/find-provider-company-by-id.query';
import { ProviderCompanyEntity } from '@domain/provider-company/entity/provider-company.entity';
import { CurrentUser } from '@presentation/decorators/current-user';
import { CurrentUserInfo } from '../auth/types';
import { UserRoles } from '@domain/user/enums';
import { CaseRequestConnection } from '@domain/case-request/entity/case-request-connection';
import { CaseQueryOptionsInput } from '@domain/case/dtos/query-options.input';
import { FindAllCaseRequestsQuery } from '@application/queries/cases/find-all-case-requests/find-all-case-requests.query';
import { CaseRequestEntity } from '@domain/case-request/entity/case-request.entity';
import { UserConnection } from '@domain/user/entity/user-connection';
import { FindAllUsersQuery } from '@application/queries/users/find-all/find-all-users.query';
import { UserEntity } from '@domain/user/entity/user.entity';
import { UserQueryOptionsInput } from '@domain/user/dtos/query-options.input';
import { FindCaseByIdQuery } from '@application/queries/cases/find-case-by-id/find-case-by-id.query';
import { UnauthorizedException } from '@nestjs/common';
import { connectionFromArray } from 'graphql-relay';
import { FindAllProviderCompaniesQuery } from '@application/queries/provider-company/find-all-provider-companies/find-all-provider-companies.query';
import { ProviderCompanyConnection } from '@domain/provider-company/entity/provider-company.connection';
import { IsPublic } from '@presentation/decorators/is-public';
import { CaseConnection } from '@domain/case/entity/case-connection';
import { CaseEntity } from '@domain/case/entity/case.entity';

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

  @Query(() => ProviderCompanyEntity, {
    name: 'providerCompany',
    nullable: true,
  })
  findOneById(@CurrentUser() user: CurrentUserInfo) {
    if (
      !user.tenantId ||
      (user.userRole !== UserRoles.PROVIDER_SUPERVISOR &&
        user.userRole !== UserRoles.PROVIDER_EMPLOYEE)
    )
      throw new UnauthorizedException();

    return this.queryBus.execute<FindProviderCompanyByIdQuery, ProviderCompany>(
      new FindProviderCompanyByIdQuery(user.tenantId),
    );
  }

  @IsPublic()
  @Query(() => ProviderCompanyConnection)
  async providerCompanies() {
    const providerCompanies = await this.queryBus.execute<
      FindAllProviderCompaniesQuery,
      Array<ProviderCompanyEntity>
    >(new FindAllProviderCompaniesQuery());

    return connectionFromArray(providerCompanies, {});
  }

  @ResolveField(() => CaseConnection, { name: 'cases' })
  findAll(
    @CurrentUser() user: CurrentUserInfo,
    @Args('options', { nullable: true }) options?: CaseQueryOptionsInput,
  ) {
    return this.queryBus.execute<FindAllCasesQuery, CaseEntity>(
      new FindAllCasesQuery(
        {
          providerCompanyId: user.tenantId,
          ...(options ?? {}),
        },
        user,
      ),
    );
  }

  @ResolveField('case', () => CaseEntity, { name: 'case' })
  findCase(@Args('id') id: string) {
    return this.queryBus.execute<FindCaseByIdQuery, CaseEntity>(
      new FindCaseByIdQuery(id),
    );
  }

  @ResolveField(() => CaseRequestConnection, { name: 'caseRequests' })
  findAllRequests(
    @CurrentUser() user: CurrentUserInfo,
    @Args('options', { nullable: true }) options?: CaseQueryOptionsInput,
  ) {
    return this.queryBus.execute<FindAllCaseRequestsQuery, CaseRequestEntity>(
      new FindAllCaseRequestsQuery(
        {
          ...options,
        },
        user,
      ),
    );
  }

  @ResolveField(() => UserConnection, { name: 'employees' })
  async findAllEmployees(
    @Args('args', { nullable: true })
    args: UserQueryOptionsInput,
    @CurrentUser() user: CurrentUserInfo,
  ) {
    return await this.queryBus.execute<FindAllUsersQuery, UserEntity>(
      new FindAllUsersQuery({ ...args, providerCompanyId: user.tenantId }),
    );
  }
}
