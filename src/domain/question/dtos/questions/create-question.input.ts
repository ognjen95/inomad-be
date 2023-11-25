import { Field, InputType } from '@nestjs/graphql';
import { QuestionType } from '../../questions/question.entity';
import { DocumentType } from '@domain/documents/enums';
import { Question } from '../../question';
import { UpdateQuestionInput } from './update-question.input';

@InputType()
export class CreateQuestionInput {
  @Field()
  text: string;

  @Field(() => [String])
  options: string[];

  @Field({ nullable: true })
  points?: number;

  @Field({ nullable: true })
  testId?: string;

  @Field(() => QuestionType)
  type: QuestionType;

  @Field({ nullable: true })
  documentName?: string;

  @Field(() => DocumentType, { nullable: true })
  documentType?: DocumentType;

  @Field({ nullable: true })
  documentId?: string;

  @Field({ nullable: true })
  hasErrors?: boolean;

  @Field(() => [String], { nullable: true })
  comments?: string[];

  @Field(() => [UpdateQuestionInput], { nullable: true })
  questions?: Question[];
}
