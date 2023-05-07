import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import { EdgesResponse } from 'src/application/common/types/query-return.type';
import { QueryOptions } from 'src/application/common/dtos/query-options/query-options.dto';
import { QUERY_TAKE } from '../common/constants';
import { IQuestionRepository } from 'src/application/common/interfaces/question/question-repository.interface';
import { Question } from 'src/domain/question/Question';

@Injectable()
export class QuestionRepository implements IQuestionRepository {
  private readonly caseSensitive = 'insensitive';

  @Inject()
  protected readonly prismaService: PrismaService;

  async create(dto: Question): Promise<Question> {
    const question = await this.prismaService.question.create({
      data: {
        text: dto.getText,
        answers: dto.getAnswers,
        points: dto.getPoints,
        questionGroupId: dto.getQuestionGroup,
        answerType: dto.getAnswerType,
      },
      include: {
        questionGroup: true,
      },
    });
    return plainToInstance(Question, question);
  }

  async findAll(options?: QueryOptions): Promise<EdgesResponse<Question>> {
    const { filters, pagination } = options || {};
    console.log('OPAAAA', filters?.contains, pagination?.take);
    const questions = await this.prismaService.question.findMany({
      where: {
        // testId: null,
        OR: [
          {
            text: {
              contains: filters?.contains,
              mode: this.caseSensitive,
            },
          },
          {
            questionGroup: {
              name: {
                contains: filters?.contains,
                mode: this.caseSensitive,
              },
            },
          },
        ],
      },
      include: {
        questionGroup: true,
      },
      // orderBy: {
      //   createdAt: 'desc',
      // }
      // take: pagination.take || QUERY_TAKE,
    });
    console.log({ first: questions });

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
        questionGroup: true,
      },
    });
    return plainToInstance(Question, questions);
  }

  async update(id: string, dto: Question): Promise<Question> {
    const questions = await this.prismaService.question.update({
      where: {
        id,
      },
      data: {
        answers: dto.getAnswers,
        text: dto.getText,
        points: dto.getPoints,
        answerType: dto.getAnswerType,
      },
      include: {
        questionGroup: true,
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
