import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class DocumentQueryOptionsInput {
  @Field({ nullable: true })
  customerId?: string;

  @Field({ nullable: true })
  providerCompanyId?: string;

  @Field({ nullable: true })
  caseId?: string;

  @Field({ nullable: true })
  fileId?: string;
}
