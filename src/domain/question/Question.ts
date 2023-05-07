import { BadRequestException } from '@nestjs/common';
import { AggregateRoot } from '@nestjs/cqrs';

export type Answer = {
  id: string;
  text: string;
  isCorrect: boolean;
  answered: boolean;
};

export class Question extends AggregateRoot {
  private id: string;

  private answerType: 'multiple' | 'single' | 'text' = 'single';

  private questionGroupId?: string;

  constructor(
    private text: string,

    private points: number,

    private answers: Answer[],

    private questionGroup?: string,
  ) {
    super();
    this.questionGroupId = questionGroup;
  }

  validateQuestions() {
    if (this.answers.length) {
      if (this.answers.length < 2) {
        throw new BadRequestException(
          'Question must have at least two answers',
        );
      }

      const correctAnswers = this.answers.filter((answer) => answer.isCorrect);
      const numberOfCorrectAnswers = correctAnswers.length;

      if (!numberOfCorrectAnswers) {
        throw new BadRequestException(
          'Question must have at least one correct answer',
        );
      }

      if (numberOfCorrectAnswers > 1) this.answerType = 'multiple';
      if (numberOfCorrectAnswers === 1) this.answerType = 'single';

      return;
    }
    this.answerType = 'text';
  }

  public update(dto: { id: string; answeredIds: string[] }) {
    this.answers = this.answers.map((answer) => ({
      ...answer,
      answered: dto.answeredIds.includes(answer.id),
    }));
  }

  public get getId(): string {
    return this.id;
  }

  public get getText(): string {
    return this.text;
  }

  public get getPoints(): number {
    return this.points;
  }

  public get getAnswers(): Answer[] {
    return this.answers;
  }

  public get getQuestionGroup(): string {
    return this.questionGroup;
  }
  get getQuestionGroupId(): string {
    return this.questionGroupId;
  }
  public get getAnswerType(): 'multiple' | 'single' | 'text' {
    return this.answerType;
  }

  public set setId(id: string) {
    this.id = id;
  }

  public set setText(text: string) {
    this.text = text;
  }

  public set setPoints(points: number) {
    this.points = points;
  }

  public set setAnswers(answers: Answer[]) {
    this.answers = answers;
  }

  public set setQuestionGroup(questionGroup: string) {
    this.questionGroup = questionGroup;
  }

  public set setAnswerType(answerType: 'multiple' | 'single' | 'text') {
    this.answerType = answerType;
  }
}
