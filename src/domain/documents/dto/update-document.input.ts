import { CreateDocumentInput } from './create-document.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateDocumentInput extends PartialType(CreateDocumentInput) {
  @Field()
  id: string;
}
