import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { plainToInstance } from 'class-transformer';
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
        questionGroup: dto.getQuestionGroup,
      },
    });
    return plainToInstance(Question, question);
  }

  async findAll(options: QueryOptions): Promise<EdgesResponse<Question>> {
    // const { filters, pagination } = options || {};
    const question = await this.prismaService.question.findMany({});
    return this.edgesFactory(plainToInstance(Question, question));
  }

  // async findOneById(id: string): Promise<Question> {
  //   const Question = await this.prismaService.Question.findUnique({ where: { id } });
  //   return plainToInstance(Question, Question);
  // }

  // async update(id: string, dto: Question): Promise<Question> {
  //   const Question = await this.prismaService.Question.update({
  //     where: { id },
  //     data: {
  //       password: dto.getPassword,
  //       employmentStatus: dto.getEmploymentStatus,
  //     },
  //   });

  //   return plainToInstance(Question, Question);
  // }

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
