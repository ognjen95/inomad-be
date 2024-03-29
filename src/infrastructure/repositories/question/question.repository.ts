import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '@infrastructure/prisma/prisma.service';
import { plainToInstance } from 'class-transformer';
import { EdgesResponse } from '@application/common/types/query-return.type';
// import { QUERY_TAKE } from '../common/constants';
import { IQuestionRepository } from '@application/common/interfaces/question/question-repository.interface';
import { Question } from '@domain/question/entity/question';
import { Question as QuestionPrisma } from '@prisma/client';

@Injectable()
export class QuestionRepository implements IQuestionRepository {
  @Inject()
  protected readonly prismaService: PrismaService;

  create(): Promise<Question> {
    throw new Error('Method not implemented.');
  }

  async createMany(dto: Question[]): Promise<Question[]> {
    const questions = await this.prismaService.question.createMany({
      data: dto.map((item) => ({
        text: item.getText,
        options: item.getOptions,
        points: item.getPoints,
        testId: item.getTestId,
        type: item.getType,
        documentId: item.getDocument.getId,
        hasErrors: item.getHasErrors ?? false,
        providerCompanyId: item.getProviderCompanyId,
        isExample: item.getIsExample,
      })),
    });

    return plainToInstance(Question, questions as unknown as QuestionPrisma[]);
  }

  async findAll(): Promise<EdgesResponse<Question>> {
    const questions = await this.prismaService.question.findMany({
      include: {
        questionGroups: true,
      },
    });

    return this.edgesFactory(plainToInstance(Question, questions));
  }

  async findAllByIds(ids: string[]): Promise<Question[]> {
    // const { filters, pagination } = options || {};
    const questions = await this.prismaService.question.findMany({
      where: {
        id: {
          in: ids,
        },
      },
      include: {
        questionGroups: true,
      },
    });
    return plainToInstance(Question, questions);
  }

  async update(id: string): Promise<Question> {
    const questions = await this.prismaService.question.update({
      where: {
        id,
      },
      data: {},
      include: {
        questionGroups: true,
      },
    });
    return plainToInstance(Question, questions);
  }
  async findOneById(id: string): Promise<Question> {
    const question = await this.prismaService.question.findUnique({
      where: { id },
    });
    return plainToInstance(Question, question);
  }

  // async remove(id: string): Promise<Question> {
  //   const removedQuestion = await this.prismaService.Question.delete({ where: { id } });
  //   return plainToInstance(Question, removedQuestion);
  // }

  edgesFactory = async (
    questions: Question[],
  ): Promise<EdgesResponse<Question>> => {
    const totalCount = await this.prismaService.question.count();

    return {
      totalCount,
      edges: questions.map((item) => {
        return {
          cursor: item.getId,
          node: plainToInstance(Question, item),
        };
      }),
      pageInfo: {
        startCursor: questions[0]?.getId,
        endCursor: questions[questions.length - 1]?.getId,
      },
    };
  };
}
