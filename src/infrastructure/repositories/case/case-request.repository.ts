import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { plainToInstance } from 'class-transformer';
import { CaseQueryOptionsInput } from 'src/domain/case/dtos/query-options.input';
import { ICaseRequestRepository } from 'src/application/common/interfaces/case/case-repository.interface';
import { CaseRequest } from 'src/domain/case-request/case-request';
import { CaseRequestStatus } from '.prisma/client';
import { Case } from 'src/domain/case/case';

@Injectable()
export class CaseRequestRepository implements ICaseRequestRepository {
  private readonly caseSensitive = 'insensitive';

  @Inject()
  protected readonly db: PrismaService;

  async create(dto: CaseRequest) {
    await this.db.caseRequest.create({
      data: {
        applicantId: dto.getApplicantId,
        providerCompanyId: dto.getProviderCompanyId,
        caseId: dto.getCaseId,
      },
    });
  }

  async update(dto: CaseRequest) {
    await this.db.caseRequest.update({
      where: {
        id: dto.getId,
      },
      data: {
        status: dto.getStatus as CaseRequestStatus,
      },
    });
  }

  async findOneById(id: string): Promise<CaseRequest> {
    const caseRequest = await this.db.caseRequest.findUnique({
      where: {
        id,
      },
    });

    return plainToInstance(CaseRequest, caseRequest);
  }

  async findManyByApplicantId(id: string): Promise<CaseRequest[]> {
    const requests = await this.db.caseRequest.findMany({
      where: {
        applicantId: id,
      },
    });

    return plainToInstance(CaseRequest, requests);
  }

  async findAll(options: CaseQueryOptionsInput): Promise<CaseRequest[]> {
    const where = options.where ?? {};

    const providerCompanyId = options.providerCompanyId
      ? {
          equals: options.providerCompanyId,
        }
      : undefined;

    const caseId = options.caseId
      ? {
          equals: options.caseId,
        }
      : undefined;

    const cases = await this.db.caseRequest.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      where: {
        ...where,
        providerCompanyId,
        caseId,
      },
      include: {
        case: {
          include: {
            applicants: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
              },
            },
          },
        },
      },
    });

    return plainToInstance(CaseRequest, cases);
  }
}
