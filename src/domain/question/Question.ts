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

  constructor(
    private text: string,
    private points: number,
    private answers: Answer[],
    private questionGroup: string,
  ) {
    super();
  }

  isValid() {
    if (this.answers.length) {
      if (this.answers.length < 2) {
        throw new BadRequestException(
          'Question must have at least two answers',
        );
      }

      const correctAnswers = this.answers.some((answer) => answer.isCorrect);
      if (!correctAnswers) {
        throw new BadRequestException(
          'Question must have at least one correct answer',
        );
      }
    }
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
}
