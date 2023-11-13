import { QuestionGroup } from '../question/question-group';
import { TestEntity } from './test.entity';

export class Test extends TestEntity {
  constructor(
    name: string,

    questionGroupIds: string[],

    percentageToPass?: number,

    timeLimit?: number,
  ) {
    super();

    this.name = name;

    this.questionGroupIds = questionGroupIds;

    this.percentageToPass = percentageToPass;

    this.timeLimit = timeLimit;
  }

  public update(dto: {
    name?: string;
    percentageToPass?: number;
    timeLimit?: number;
    startedAt?: Date;
    endsAt?: Date;
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

  public get getPercentageToPass(): number {
    return this.percentageToPass;
  }

  public get getPercentageScored(): number {
    return this.percentageScored;
  }

  public get getTimeLimit(): number {
    return this.timeLimit;
  }

  public get getStartedAt(): Date {
    return this.startedAt;
  }

  public get getEndsAt(): Date {
    return this.endsAt;
  }

  public get getCreatedAt(): Date {
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

  public set setPercentageToPass(percentageToPass: number) {
    this.percentageToPass = percentageToPass;
  }

  public set setPercentageScored(percentageScored: number) {
    this.percentageScored = percentageScored;
  }

  public set setTimeLimit(timeLimit: number) {
    this.timeLimit = timeLimit;
  }

  public set setStartedAt(startedAt: Date) {
    this.startedAt = startedAt;
  }

  public set setEndsAt(endsAt: Date) {
    this.endsAt = endsAt;
  }

  public set setEmployeeId(employeeId: string) {
    this.employeeId = employeeId;
  }

  public set setCreatedAt(createdAt: Date) {
    this.createdAt = createdAt;
  }

  public get getProviderCompanyId(): string {
    return this.providerCompanyId;
  }

  public set setProviderCompanyId(providerCompanyId: string) {
    this.providerCompanyId = providerCompanyId;
  }

  public get getCaseId(): string {
    return this.caseId;
  }

  public set setCaseId(caseId: string) {
    this.caseId = caseId;
  }

  public get getQuestionGroupIds(): string[] {
    return this.questionGroupIds;
  }

  public set setQuestionGroupIds(questionGroupIds: string[]) {
    this.questionGroupIds = questionGroupIds;
  }

  public get getQuestionGroups(): QuestionGroup[] {
    return this.questionGroups;
  }

  public set setQuestionGroups(questionGroups: QuestionGroup[]) {
    this.questionGroups = questionGroups;
  }
}
