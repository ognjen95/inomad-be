import { Document } from '../../documents/document';
import { DocumentType } from '../../documents/enums';
import { QuestionGroup } from './question-group';
import {
  AnswerEntity,
  QuestionEntity,
  QuestionType,
} from '../questions/question.entity';
import { v4 as uuidv4 } from 'uuid';

export class Question extends QuestionEntity {
  constructor(
    text: string,
    options: string[],
    points: number,
    testId: string,
    type: QuestionType,
    document: Document,
    hasErrors: boolean,
    comments: string[],
  ) {
    super();
    this.text = text;
    this.options = options;
    this.points = points;
    this.testId = testId;
    this.type = type;
    this.document = document;
    this.hasErrors = hasErrors;
    this.comments = comments;
    this.isExample = true;
  }

  set setId(id: string) {
    this.id = id;
  }

  get getId(): string {
    return this.id;
  }

  set setText(text: string) {
    this.text = text;
  }

  get getText(): string {
    return this.text;
  }

  set setOptions(options: string[]) {
    this.options = options;
  }

  get getOptions(): string[] {
    return this.options;
  }

  set setPoints(points: number) {
    this.points = points;
  }

  get getPoints(): number {
    return this.points;
  }

  set setTestId(testId: string) {
    this.testId = testId;
  }

  get getTestId(): string {
    return this.testId;
  }

  set setAnswers(answers: Partial<AnswerEntity>[]) {
    const mappedAnswers = answers.map((answer) => ({
      id: uuidv4(),
      text: answer?.text,
      isCorrect: answer?.isCorrect,
      answered: answer?.answered,
    }));

    this.answers = mappedAnswers;
  }

  get getAnswers(): AnswerEntity[] {
    return this.answers;
  }

  set setType(type: QuestionType) {
    this.type = type;
  }

  get getType(): QuestionType {
    return this.type;
  }

  set setQuestionGroup(questionGroup: QuestionGroup[]) {
    this.questionGroups = questionGroup;
  }

  get getQuestionGroup(): QuestionGroup[] {
    return this.questionGroups;
  }

  get getQuestionGroupId(): string {
    return this.questionGroupId;
  }

  set setQuestionGroupId(questionGroupId: string) {
    this.questionGroupId = questionGroupId;
  }

  set setDocument(document: Document) {
    this.document = document;
  }

  get getDocument(): Document {
    return this.document;
  }

  set setHasErrors(hasErrors: boolean) {
    this.hasErrors = hasErrors ?? false;
  }

  get getHasErrors(): boolean {
    return this.hasErrors;
  }

  get getProviderCompanyId(): string {
    return this.providerCompanyId;
  }

  set setProviderCompanyId(providerCompanyId: string) {
    this.providerCompanyId = providerCompanyId;
  }

  get getDocumentId(): string {
    return this.documentId;
  }

  set setDocumentId(documentId: string) {
    this.documentId = documentId;
  }

  get getDocumentName(): string {
    return this.documentName;
  }

  set setDocumentName(documentName: string) {
    this.documentName = documentName;
  }

  get getDocumentFileId(): string {
    return this.documentFileId;
  }

  set setDocumentFileId(documentFileId: string) {
    this.documentFileId = documentFileId;
  }

  get getDocumentType(): DocumentType {
    return this.documentType;
  }

  set setDocumentType(documentType: DocumentType) {
    this.documentType = documentType;
  }

  get getIsExample(): boolean {
    return this.isExample;
  }

  set setIsExample(isExample: boolean) {
    this.isExample = isExample;
  }
}
