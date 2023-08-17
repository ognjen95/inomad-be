import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { ICaseRepository } from 'src/application/common/interfaces/case/case-repository.interface';
import { Case } from 'src/domain/case/Case';
import { CaseStatus } from '@prisma/client';
import { plainToInstance } from 'class-transformer';
import { UserQueryOptions } from 'src/domain/user/dtos/user-query-options';

@Injectable()
export class CaseRepository implements ICaseRepository {
  private readonly caseSensitive = 'insensitive';

  @Inject()
  protected readonly db: PrismaService;

  async create(dto: Case) {
    await this.db.case.create({
      data: {
        name: dto.getName,
        isPrivate: dto.getIsPrivate,
        employeesIds: dto.getEmployeesIds,
        providersIds: dto.getProvidersIds,
        applicantsIds: dto.getApplicantsIds,
      },
    });
  }

  async update(dto: Case) {
    await this.db.case.update({
      where: {
        id: dto.getId,
      },
      data: {
        name: dto.getName,
        isPrivate: dto.getIsPrivate,
        employeesIds: dto.getEmployeesIds,
        providersIds: dto.getProvidersIds,
        applicantsIds: dto.getApplicantsIds,
        status: dto.getStatus as CaseStatus,
        providerCompanyId: dto.getProviderCompanyId,
        employerCompanyId: dto.getEmployerCompanyId,
        updatedAt: new Date(),
      },
    });
  }

  async findOneById(id: string): Promise<Case> {
    const foundCase = await this.db.case.findUnique({
      where: {
        id,
      },
    });

    return plainToInstance(Case, foundCase);
  }

  async findAll(options: UserQueryOptions): Promise<Case[]> {
    console.log(options);
    const cases = await this.db.case.findMany({
      where: {
        ...options.where,
        applicantsIds: {
          has: options.userId,
        },
      },
    });

    return plainToInstance(Case, cases);
  }
}
