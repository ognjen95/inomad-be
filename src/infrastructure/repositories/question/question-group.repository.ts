import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '@infrastructure/prisma/prisma.service';
import { plainToInstance } from 'class-transformer';
import { QuestionGroup } from '@domain/question/entity/question-group';
import { IQuestionGroupRepository } from '@application/common/interfaces/question/question-group-repository.interface';
import { QuestionGroupOptionsInput } from '@domain/question/dtos/question-group-query-options.input';

@Injectable()
export class QuestionGroupRepository implements IQuestionGroupRepository {
  private readonly caseSensitive = 'insensitive';

  @Inject()
  protected readonly prismaService: PrismaService;

  async create(dto: QuestionGroup): Promise<QuestionGroup> {
    const question = await this.prismaService.questionGroup.create({
      data: {
        name: dto.getName,
        isExample: dto.getIsExample,
        providerCompanyId: dto.getProviderCompanyId,
        questions: {
          create: dto.getQuestions.map((item) => ({
            text: item.getText,
            options: item.getOptions,
            points: item.getPoints,
            testId: item.getTestId,
            type: item.getType,
            documentName: item.getDocumentName,
            documentType: item.getDocumentType,
            hasErrors: item.getHasErrors ?? false,
            providerCompanyId: item.getProviderCompanyId,
            isExample: item.getIsExample,
          })),
        },
      },
    });

    return plainToInstance(QuestionGroup, question);
  }

  async update(dto: QuestionGroup): Promise<QuestionGroup> {
    const question = await this.prismaService.questionGroup.update({
      where: {
        id: dto.getId,
      },
      include: {
        questions: true,
      },
      data: {
        name: dto.getName,
        providerCompanyId: dto.getProviderCompanyId,
        isExample: dto.getIsExample,
        questions: {
          update: dto.getQuestions.map((item) => ({
            where: {
              id: item.getId,
            },
            data: {
              text: item.getText,
              options: item.getOptions,
              points: item.getPoints,
              testId: item.getTestId ?? undefined,
              type: item.getType,
              documentId: item.getDocumentId,
              documentFileId: item.getDocumentFileId,
              documentName: item.getDocumentName,
              documentType: item.getDocumentType,
              isExample: item.getIsExample,
              hasErrors: item.getHasErrors ?? false,
              providerCompanyId: item.getProviderCompanyId,
              answers: item?.getAnswers?.map((answer) => ({
                text: answer.text,
                isCorrect: answer.isCorrect,
                id: answer.id,
                answered: answer.answered,
              })),
            },
          })),
        },
      },
    });

    return plainToInstance(QuestionGroup, question);
  }

  async findAll(
    queryOptions: QuestionGroupOptionsInput,
  ): Promise<Array<QuestionGroup>> {
    console.log('queryOptions', queryOptions);
    const question = await this.prismaService.questionGroup.findMany({
      where: queryOptions?.where,
      include: {
        questions: {
          include: {
            document: true,
          },
        },
      },
    });

    return plainToInstance(QuestionGroup, question);
  }
}
