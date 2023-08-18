import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { ICaseRepository } from 'src/application/common/interfaces/case/case-repository.interface';
import { Case } from 'src/domain/case/case';
import { CaseStatus } from '@prisma/client';
import { plainToInstance } from 'class-transformer';
import { CaseQueryOptionsInput } from 'src/domain/case/dtos/query-options.input';

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

  async findAll(options: CaseQueryOptionsInput): Promise<Case[]> {
    const where = options.where ?? {};
    const applicantsIds = options.userId
      ? {
          has: options.userId,
        }
      : undefined;

    const providerCompanyId = options.providerCompanyId
      ? {
          equals: options.providerCompanyId,
        }
      : undefined;

    console.log({ id: options.providerCompanyId });
    const cases = await this.db.case.findMany({
      where: {
        ...where,
        applicantsIds,
        providerCompanyId: options.providerCompanyId,
      },
    });

    return plainToInstance(Case, cases);
  }
}
