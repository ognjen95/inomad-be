import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { ICaseRepository } from 'src/application/common/interfaces/case/case-request-repository.interface';
import { Case } from 'src/domain/case/case';
import { CaseStatus } from '@prisma/client';
import { plainToInstance } from 'class-transformer';
import { CaseQueryOptionsInput } from 'src/domain/case/dtos/query-options.input';

@Injectable()
export class CaseRepository implements ICaseRepository {
  private readonly caseSensitive = 'insensitive';

  @Inject()
  protected readonly db: PrismaService;

  async create(dto: Case): Promise<Case> {
    const createdCase = await this.db.case.create({
      data: {
        name: dto.getName,
        isPrivate: dto.getIsPrivate,
        applicants: {
          connect: dto.getApplicantsIds.map((id) => ({ id })),
        },
        providers: {
          connect: dto.getProvidersIds.map((id) => ({ id })),
        },
        employees: {
          connect: dto.getEmployeesIds.map((id) => ({ id })),
        },
      },
    });

    return plainToInstance(Case, createdCase);
  }

  async update(dto: Case): Promise<Case> {
    const updatedCase = await this.db.case.update({
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

    return plainToInstance(Case, updatedCase);
  }

  async findOneById(id: string): Promise<Case> {
    const foundCase = await this.db.case.findUnique({
      where: {
        id,
      },
    });
    console.log({ foundCase });
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

    const cases = await this.db.case.findMany({
      where: {
        ...where,
        applicantsIds,
        providerCompanyId,
      },
    });

    return plainToInstance(Case, cases);
  }
}
