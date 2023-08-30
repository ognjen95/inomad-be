import { InputType, Field, registerEnumType } from '@nestjs/graphql';
import { DocumentType } from '../enums';

@InputType()
export class CreateDocumentInput {
  @Field()
  name: string;

  @Field(() => DocumentType)
  documentType: DocumentType;

  @Field({ nullable: true })
  fileId: string;

  @Field({ nullable: true })
  customerId: string;

  @Field({ nullable: true })
  providerCompanyId: string;

  @Field({ nullable: true })
  caseId: string;
}

registerEnumType(DocumentType, {
  name: 'DocumentType',
});
