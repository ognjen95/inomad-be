import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateProviderCompanyInput {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  firstName: string;

  @Field({ nullable: true, defaultValue: '' })
  middleName?: string;

  @Field()
  lastName: string;

  @Field()
  password: string;

  @Field({ nullable: true })
  website: string;
}
