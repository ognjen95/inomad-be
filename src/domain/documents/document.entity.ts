import { AggregateRoot } from '@nestjs/cqrs';
import { ObjectType, Field, registerEnumType } from '@nestjs/graphql';
import { DocumentType } from './enums';

@ObjectType()
export class DocumentEntity extends AggregateRoot {
  @Field()
  protected id: string;

  @Field({ nullable: true })
  protected fileId: string;

  @Field()
  protected name: string;

  @Field(() => DocumentType)
  protected documentType: DocumentType;

  @Field(() => Date)
  protected createdAt: Date;

  @Field({ nullable: true })
  protected customerId: string;

  @Field({ nullable: true })
  protected providerCompanyId: string;

  @Field({ nullable: true })
  protected caseId: string;
}

registerEnumType(DocumentType, {
  name: 'DocumentType',
});
