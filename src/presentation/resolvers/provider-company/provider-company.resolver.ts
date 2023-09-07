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
import { MutationReturn } from 'src/application/common/return-dtos/mutation-return-dt0';
import { ProviderCompany } from 'src/domain/provider-company/provider-company';
import { CaseConnection } from 'src/domain/case/case-connection';
import { FindAllCasesQuery } from 'src/application/queries/cases/find-all-cases/find-all-cases.query';
import { CaseEntity } from 'src/domain/case/case.entity';
import { FindProviderCompanyByIdQuery } from 'src/application/queries/provider-company/find-provider-company-by-id/find-provider-company-by-id.query';
import { ProviderCompanyEntity } from 'src/domain/provider-company/provider-company.entity';
import { CurrentUser } from 'src/presentation/decorators/current-user';
import { CurrentUserInfo } from '../auth/types';
import { UserRoles } from 'src/domain/user/enums';
import { CaseRequestConnection } from 'src/domain/case-request/case-request-connection';
import { CaseQueryOptionsInput } from 'src/domain/case/dtos/query-options.input';
import { FindAllCaseRequestsQuery } from 'src/application/queries/cases/find-all-case-requests/find-all-case-requests.query';
import { CaseRequestEntity } from 'src/domain/case-request/case-request.entity';
import { QueryOptionsInput } from 'src/domain/common/query-options.dto';
import { UserConnection } from 'src/domain/user/user-connection';
import { FindAllUsersQuery } from 'src/application/queries/users/find-all/find-all-users.query';
import { UserEntity } from 'src/domain/user/user.entity';
import { UserQueryOptionsInput } from 'src/domain/user/dtos/query-options.input';

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
      return null;

    return this.queryBus.execute<FindProviderCompanyByIdQuery, ProviderCompany>(
      new FindProviderCompanyByIdQuery(user.tenantId),
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
