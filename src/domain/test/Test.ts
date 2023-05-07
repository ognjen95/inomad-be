import { AggregateRoot } from '@nestjs/cqrs';
import { Question } from '../question/Question';

export class Test extends AggregateRoot {
  private id: string;

  private percentageScored?: number;

  private startedAt?: string;

  private endsAt?: string;

  private createdAt?: string;

  private employeeId?: string;

  private questions: Question[] = [];

  constructor(
    private name: string,

    private percentageToPass: number,

    private timeLimit?: number,
  ) {
    super();
  }

  public update(dto: {
    name?: string;
    percentageToPass?: number;
    timeLimit?: number;
    startedAt?: string;
    endsAt?: string;
    employeeId?: string;
  }) {
    Object.keys(dto).forEach((key) => {
      const value = dto[key];
      if (value) {
        this[key] = value;
      }
    });
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

  public get getStartedAt(): string {
    return this.startedAt;
  }

  public get getEndsAt(): string {
    return this.endsAt;
  }

  public get getCreatedAt(): string {
    return this.createdAt;
  }

  public get getEmployeeId(): string {
    return this.employeeId;
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

  public set setStartedAt(startedAt: string) {
    this.startedAt = startedAt;
  }

  public set setEndsAt(endsAt: string) {
    this.endsAt = endsAt;
  }

  public set setEmployeeId(employeeId: string) {
    this.employeeId = employeeId;
  }
}
