import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { plainToInstance } from 'class-transformer';
import { EdgesResponse } from 'src/application/common/types/query-return.type';
import { QUERY_TAKE } from '../common/constants';
import { Test } from 'src/domain/test/Test';
import { ITestRepository } from 'src/application/common/interfaces/test/test-repository.interface';
import { QueryOptions } from 'src/application/common/dtos/query-options/query-options.dto';

@Injectable()
export class TestRepository implements ITestRepository {
  private readonly caseSensitive = 'insensitive';

  @Inject()
  protected readonly prismaService: PrismaService;

  async create(dto: Test): Promise<Test> {
    const question = await this.prismaService.test.create({
      data: {
        name: dto.getName,
        questions: {
          createMany: {
            data: dto.getQuestions.map((question) => ({
              text: question.getText,
              answers: question.getAnswers,
              points: question.getPoints,
              questionGroupId: question.getQuestionGroup,
            })),
          },
        },
        timeLimit: dto.getTimeLimit ?? 0,
        percentageToPass: dto.getPercentageToPass,
      },
      include: {
        questions: true,
      },
    });
    return plainToInstance(Test, question);
  }

  async findAll(options: QueryOptions): Promise<EdgesResponse<Test>> {
    const { filters, pagination } = options || {};
    const question = await this.prismaService.test.findMany({
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
    });
    return this.edgesFactory(plainToInstance(Test, question));
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
