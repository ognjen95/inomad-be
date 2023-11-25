import { Question } from './question';
import { plainToInstance } from 'class-transformer';
import { QuestionGroupEntity } from '../questions/question-group.entity';

export class QuestionGroup extends QuestionGroupEntity {
  constructor(name: string, questionIds?: string[]) {
    super();

    this.name = name;

    this.questionIds = questionIds;

    this.isExample = true;
  }

  get getId(): string {
    return this.id;
  }

  set setId(id: string) {
    this.id = id;
  }

  public get getName(): string {
    return this.name;
  }

  set setName(name: string) {
    this.name = name;
  }

  get getProviderCompanyId(): string {
    return this.providerCompanyId;
  }

  set setProviderCompanyId(providerCompanyId: string) {
    this.providerCompanyId = providerCompanyId;
  }

  get getQuestionIds(): string[] {
    return this.questionIds;
  }

  set setQuestionIds(questionIds: string[]) {
    this.questionIds = questionIds;
  }

  get getQuestions(): Question[] {
    return plainToInstance(Question, this.questions);
  }

  set setQuestions(questions: Question[]) {
    this.questions = questions;
  }

  set setTestId(testId: string) {
    this.testId = testId;
  }

  get getTestId(): string {
    return this.testId;
  }

  set setIsExample(isExample: boolean) {
    this.isExample = isExample;
  }

  get getIsExample(): boolean {
    return this.isExample;
  }
}
