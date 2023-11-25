import { InputType, Field } from '@nestjs/graphql';
import { CreateDocumentInput } from '@domain/documents/dto/create-document.input';

@InputType()
export class UpdateCaseAdditionalDocumentsInput {
  @Field()
  caseId: string;

  @Field(() => [CreateDocumentInput])
  additionalDocuments: CreateDocumentInput[];
}
