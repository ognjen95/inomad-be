import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { plainToInstance } from 'class-transformer';
import { Test } from 'src/domain/test/Test';
import { ITestRepository } from 'src/application/common/interfaces/test/test-repository.interface';
import { TestQueryOptionsInput } from 'src/domain/test/dtos/tests/test-query-options.input';

@Injectable()
export class TestRepository implements ITestRepository {
  private readonly caseSensitive = 'insensitive';

  @Inject()
  protected readonly prismaService: PrismaService;

  async upsert(dto: Test): Promise<Test> {
    if (dto.getId) {
      const test = await this.prismaService.test.update({
        where: { id: dto.getId },
        data: {
          name: dto.getName,
          employeeId: dto.getEmployeeId,
          timeLimit: dto.getTimeLimit,
          percentageToPass: dto.getPercentageToPass,
          questionGroups: {
            connect: dto.getQuestionGroups.map((question) => ({
              id: question.getId,
            })),
          },
          caseId: dto.getCaseId,
          providerCompanyId: dto.getProviderCompanyId,
        },
      });

      return plainToInstance(Test, test);
    } else {
      const test = await this.prismaService.test.create({
        data: {
          name: dto.getName,
          employee: dto?.getEmployeeId
            ? {
                connect: {
                  id: dto.getEmployeeId ?? undefined,
                },
              }
            : undefined,
          timeLimit: dto.getTimeLimit,
          percentageToPass: dto.getPercentageToPass,
          questionGroups: dto.getQuestionGroups?.length
            ? {
                connect: dto.getQuestionGroups.map((grp) => ({
                  id: grp.getId,
                })),
              }
            : undefined,
          case: dto?.getCaseId
            ? {
                connect: {
                  id: dto.getCaseId ?? undefined,
                },
              }
            : undefined,
          providerCompanyId: dto.getProviderCompanyId,
        },
      });

      return plainToInstance(Test, test);
    }
  }

  async copayAndAssignTemplate(test: Test) {
    const newTest = await this.prismaService.test.create({
      data: {
        name: test.getName,
        timeLimit: test.getTimeLimit,
        percentageToPass: test.getPercentageToPass,
        questionGroups: {
          create: test.getQuestionGroups?.map((questionGroups) => ({
            name: questionGroups.getName,
            providerCompanyId: questionGroups.getProviderCompanyId,
            isExample: false,
            questions: {
              create: questionGroups.getQuestions?.map((question) => ({
                text: question.getText,
                options: question.getOptions,
                points: question.getPoints,
                type: question.getType,
                documentName: question.getDocumentName,
                documentType: question.getDocumentType,
                providerCompanyId: question.getProviderCompanyId,
                isExample: false,
              })),
            },
          })),
        },
        case: {
          connect: {
            id: test.getCaseId,
          },
        },
        providerCompanyId: test.getProviderCompanyId,
      },
    });

    return plainToInstance(Test, newTest);
  }

  async findAll(options: TestQueryOptionsInput): Promise<Array<Test>> {
    const test = await this.prismaService.test.findMany({
      include: {
        questionGroups: {
          include: {
            questions: true,
          },
        },
      },
      where: {
        caseId: {
          isSet: options?.caseId ? undefined : false,
          equals: options?.caseId ?? undefined,
        },
        providerCompanyId: options?.providerCompanyId ?? undefined,
        id: options.id ?? undefined,
      },
      // take: pagination?.take ?? QUERY_TAKE,
      orderBy: {
        createdAt: 'desc',
      },
    });

    return plainToInstance(Test, test);
  }

  async findOneById(id: string): Promise<Test> {
    const test = await this.prismaService.test.findUnique({
      where: {
        id,
      },
      include: {
        questionGroups: true,
      },
    });

    return plainToInstance(Test, test);
  }
}
