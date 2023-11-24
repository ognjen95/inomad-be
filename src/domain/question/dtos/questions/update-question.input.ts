import { InputType, Field } from '@nestjs/graphql';
import { UpdateDocumentInput } from 'src/domain/documents/dto/update-document.input';
import { Document } from 'src/domain/documents/document';

@InputType()
export class AnswerInput {
  @Field({ nullable: true })
  id?: string;

  @Field({ nullable: true })
  text?: string;

  @Field({ nullable: true })
  isCorrect?: boolean;

  @Field({ nullable: true })
  answer?: boolean;
}

@InputType()
export class UpdateQuestionInput {
  @Field()
  id: string;

  @Field()
  text?: string;

  @Field(() => [String], { nullable: true })
  options?: string[];

  @Field({ nullable: true })
  points?: number;

  @Field(() => [AnswerInput])
  answers?: AnswerInput[];

  @Field(() => UpdateDocumentInput, { nullable: true })
  document?: Document;

  @Field({ nullable: true })
  documentId?: string;

  @Field({ nullable: true })
  hasErrors?: boolean;

  @Field(() => [String], { nullable: true })
  comments?: string[];

  @Field(() => [String], {
    nullable: true,
    description: 'List of ids of the questions that have been answered',
  })
  answeredIds?: string[];
}
