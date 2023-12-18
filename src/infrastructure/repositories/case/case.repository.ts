import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '@infrastructure/prisma/prisma.service';
import { ICaseRepository } from '@application/common/interfaces/case/case-request-repository.interface';
import { Case } from '@domain/case';
import { ApplicantFamilyMembers } from '@prisma/client';
import { plainToInstance } from 'class-transformer';
import { CaseQueryOptionsInput } from '@domain/case/dtos/query-options.input';

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
        description: dto.getDescription,
        generalInfo: {
          firstName: dto.getGeneralInfo?.firstName,
          middleName: dto.getGeneralInfo?.middleName,
          lastName: dto.getGeneralInfo?.lastName,
          birthday: dto.getGeneralInfo?.birthday,
          email: dto.getGeneralInfo?.email,
          nationality: dto.getGeneralInfo?.nationality,
          phone: dto.getGeneralInfo?.phone,
        },
        familyInfo: {
          familyMembers: dto.getFamilyInfo
            ?.familyMembers as ApplicantFamilyMembers,
          children: dto.getFamilyInfo?.children ?? [],
          spouse: dto.getFamilyInfo?.spouse,
        },
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
        providers: {
          connect: dto.getProvidersIds.map((id) => ({ id })),
        },
        employees: {
          connect: dto.getEmployeesIds.map((id) => ({ id })),
        },
        applicants: {
          connect: dto.getApplicantsIds.map((id) => ({ id })),
        },
        generalInfo: {
          firstName: dto.getGeneralInfo?.firstName,
          middleName: dto.getGeneralInfo?.middleName,
          lastName: dto.getGeneralInfo?.lastName,
          birthday: dto.getGeneralInfo?.birthday,
          email: dto.getGeneralInfo?.email,
          passportFileId: dto.getGeneralInfo?.passportFileId,
          nationality: dto.getGeneralInfo?.nationality,
          phone: dto.getGeneralInfo?.phone,
        },
        education: {
          degree: dto.getEducationInfo?.degree,
          university: dto.getEducationInfo?.university,
          diplomaFileId: dto.getEducationInfo?.diplomaFileId,
          confirmationLetterFileId:
            dto.getEducationInfo?.confirmationLetterFileId,
        },
        workInfo: {
          contractType: dto.getWorkInfo?.contractType,
          contractFileId: dto.getWorkInfo?.contractFileId,
          jobTitle: dto.getWorkInfo?.jobTitle,
          yearsOfExperience: dto.getWorkInfo?.yearsOfExperience,
          monthlyIncome: dto.getWorkInfo?.monthlyIncome,
          cvFileId: dto.getWorkInfo?.cvFileId,
          invoicesFilesIds: dto.getWorkInfo?.invoicesFilesIds ?? [],
        },
        familyInfo: {
          familyMembers: dto.getFamilyInfo
            ?.familyMembers as ApplicantFamilyMembers,
          children: dto.getFamilyInfo?.children ?? [],
          spouse: dto.getFamilyInfo?.spouse,
        },
        applicantsIds: dto.getApplicantsIds,
        status: dto.getStatus,
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
      include: {
        documents: true,
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

    const providerCompanyId =
      options.providerCompanyId || options.isAvailable
        ? {
            ...(options.providerCompanyId && {
              equals: options.providerCompanyId,
            }),
            ...(options.isAvailable && {
              isSet: false,
            }),
          }
        : undefined;

    const applicants = options.userId
      ? {
          some: {
            id: options.userId,
          },
        }
      : undefined;

    const cases = await this.db.case.findMany({
      where: {
        ...where,
        applicantsIds,
        providerCompanyId,
        applicants,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        documents: true,
        applicants: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        providers: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });

    return plainToInstance(Case, cases);
  }
}
