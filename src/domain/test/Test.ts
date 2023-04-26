import { AggregateRoot } from '@nestjs/cqrs';
import { Question } from '../question/Question';

export class Test extends AggregateRoot {
  private id: string;

  private percentageScored?: number;

  private startedAt?: number;

  private endsAt?: number;

  private questions: Question[] = [];

  constructor(
    private name: string,

    private percentageToPass: number,

    private timeLimit?: number,
  ) {
    super();
  }

  public get getId(): string {
    return this.id;
  }

  public get getName(): string {
    return this.name;
  }

  public get getQuestions(): Question[] {
    return this.questions;
  }

  public get getPercentageToPass(): number {
    return this.percentageToPass;
  }

  public get getPercentageScored(): number {
    return this.percentageScored;
  }

  public get getTimeLimit(): number {
    return this.timeLimit;
  }

  public get getStartedAt(): number {
    return this.startedAt;
  }

  public get getEndsAt(): number {
    return this.endsAt;
  }

  public set setId(id: string) {
    this.id = id;
  }

  public set setName(name: string) {
    this.name = name;
  }

  public set setQuestions(questions: Question[]) {
    this.questions = questions;
  }

  public set setPercentageToPass(percentageToPass: number) {
    this.percentageToPass = percentageToPass;
  }

  public set setPercentageScored(percentageScored: number) {
    this.percentageScored = percentageScored;
  }

  public set setTimeLimit(timeLimit: number) {
    this.timeLimit = timeLimit;
  }

  public set setStartedAt(startedAt: number) {
    this.startedAt = startedAt;
  }

  public set setEndsAt(endsAt: number) {
    this.endsAt = endsAt;
  }
}
