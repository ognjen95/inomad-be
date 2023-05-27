import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { plainToInstance } from 'class-transformer';
import { EdgesResponse } from 'src/application/common/types/query-return.type';
import { QUERY_TAKE } from '../common/constants';
import { Test } from 'src/domain/test/Test';
import { ITestRepository } from 'src/application/common/interfaces/test/test-repository.interface';
import { QueryOptions } from 'src/domain/question/dtos/query-options.dto';

@Injectable()
export class TestRepository implements ITestRepository {
  private readonly caseSensitive = 'insensitive';

  @Inject()
  protected readonly prismaService: PrismaService;

  async create(dto: Test): Promise<Test> {
    const test = await this.prismaService.test.create({
      data: {
        name: dto.getName,
        employeeId: dto.getEmployeeId,
        timeLimit: dto.getTimeLimit ?? 0,
        percentageToPass: dto.getPercentageToPass,
        questions: {
          createMany: {
            data: dto.getQuestions.map((question) => ({
              text: question.getText,
              answers: question.getAnswers,
              points: question.getPoints,
              questionGroupId: question.getQuestionGroupId,
              answerType: question.getAnswerType,
            })),
          },
        },
      },
      include: {
        questions: true,
      },
    });
    return plainToInstance(Test, test);
  }

  async update(id: string, dto: Test): Promise<Test> {
    const test = await this.prismaService.test.update({
      where: { id },
      data: {
        name: dto.getName,
        employeeId: dto.getEmployeeId,
        timeLimit: dto.getTimeLimit ?? 0,
        percentageToPass: dto.getPercentageToPass,
        startedAt: dto.getStartedAt,
        endsAt: dto.getEndsAt,
      },
      include: {
        questions: true,
      },
    });
    return plainToInstance(Test, test);
  }

  async findAll(options: QueryOptions): Promise<EdgesResponse<Test>> {
    const { filters, pagination } = options || {};
    const test = await this.prismaService.test.findMany({
      include: {
        questions: true,
      },
      where: {
        name: {
          contains: filters?.contains ?? '',
          mode: this.caseSensitive,
        },
      },
      take: pagination?.take ?? QUERY_TAKE,
      orderBy: {
        createdAt: 'desc',
      },
    });
    return this.edgesFactory(plainToInstance(Test, test));
  }

  async findOneById(id: string): Promise<Test> {
    const test = await this.prismaService.test.findUnique({
      where: {
        id,
      },
      include: {
        questions: true,
      },
    });
    return plainToInstance(Test, test);
  }

  edgesFactory = async (questions: Test[]): Promise<EdgesResponse<Test>> => {
    const totalCount = await this.prismaService.question.count();

    return {
      totalCount,
      edges: questions.map((item) => {
        return {
          cursor: item.getId,
          node: plainToInstance(Test, item),
        };
      }),
      pageInfo: {
        startCursor: questions[0]?.getId,
        endCursor: questions[questions.length - 1]?.getId,
      },
    };
  };
}
