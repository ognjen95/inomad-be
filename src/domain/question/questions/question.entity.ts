import { ObjectType, Field, registerEnumType } from '@nestjs/graphql';
import { QuestionGroupEntity } from './question-group.entity';
import { DocumentEntity } from '@domain/documents/document.entity';
import { Document } from '@domain/documents/document';
import { AggregateRoot } from '@nestjs/cqrs';
import { DocumentType } from '@domain/documents/enums';
import { QuestionGroup } from '../question-group';

@ObjectType()
export class AnswerEntity {
  @Field({ nullable: true })
  id: string;

  @Field({ nullable: true })
  text: string;

  @Field({ nullable: true })
  isCorrect: boolean;

  @Field({ nullable: true })
  answered: boolean;
}

@ObjectType()
export class QuestionEntity extends AggregateRoot {
  @Field()
  protected id: string;

  @Field()
  protected text: string;

  @Field(() => [String])
  protected options: string[];

  @Field({ nullable: true })
  protected points?: number;

  @Field({ nullable: true })
  protected testId?: string;

  @Field(() => [AnswerEntity], { nullable: 'itemsAndList' })
  protected answers?: AnswerEntity[];

  @Field(() => QuestionType)
  protected type: QuestionType;

  @Field(() => [QuestionGroupEntity], { nullable: true })
  protected questionGroups?: QuestionGroup[];

  @Field({ nullable: true, defaultValue: true })
  protected isExample?: boolean;

  @Field({ nullable: true })
  protected questionGroupId?: string;

  @Field(() => DocumentEntity, { nullable: true })
  protected document?: Document;

  @Field({ nullable: true })
  protected documentId?: string;

  @Field({ nullable: true })
  protected documentName?: string;

  @Field({ nullable: true })
  protected documentFileId?: string;

  @Field(() => DocumentType, { nullable: true })
  protected documentType?: DocumentType;

  @Field({ nullable: true })
  protected hasErrors?: boolean;

  @Field(() => [String], { nullable: true })
  protected comments?: string[];

  @Field({ nullable: true })
  protected answerType?: string;

  @Field({ nullable: true })
  protected providerCompanyId?: string;
}

export enum QuestionType {
  TEXT = 'TEXT',
  SELECT = 'SELECT',
  MULTISELECT = 'MULTISELECT',
  RADIO = 'RADIO',
  CHECKBOX = 'CHECKBOX',
  FILE = 'FILE',
}

registerEnumType(QuestionType, {
  name: 'QuestionType',
});
