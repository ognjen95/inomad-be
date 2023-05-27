import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { plainToInstance } from 'class-transformer';
import { EdgesResponse } from 'src/application/common/types/query-return.type';
import { QueryOptions } from 'src/domain/question/dtos/query-options.dto';
import { QUERY_TAKE } from '../common/constants';
import { QuestionGroup } from 'src/domain/question/QuestionGroup';
import { IQuestionGroupRepository } from 'src/application/common/interfaces/question/question-group-repository.interface';

@Injectable()
export class QuestionGroupRepository implements IQuestionGroupRepository {
  private readonly caseSensitive = 'insensitive';

  @Inject()
  protected readonly prismaService: PrismaService;

  async create(dto: QuestionGroup): Promise<QuestionGroup> {
    const question = await this.prismaService.questionGroup.create({
      data: {
        name: dto.getName,
      },
    });
    return plainToInstance(QuestionGroup, question);
  }

  async findAll(options: QueryOptions): Promise<EdgesResponse<QuestionGroup>> {
    // const { filters, pagination } = options || {};
    const question = await this.prismaService.questionGroup.findMany({});
    return this.edgesFactory(plainToInstance(QuestionGroup, question));
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
    questions: QuestionGroup[],
  ): Promise<EdgesResponse<QuestionGroup>> => {
    const totalCount = await this.prismaService.question.count();

    return {
      totalCount,
      edges: questions.map((item) => {
        return {
          cursor: item.getId,
          node: plainToInstance(QuestionGroup, item),
        };
      }),
      pageInfo: {
        startCursor: questions[0]?.getId,
        endCursor: questions[questions.length - 1]?.getId,
      },
    };
  };
}
