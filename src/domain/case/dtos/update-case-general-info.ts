import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateCaseGeneralInfoInput {
  @Field(() => String)
  id: string;

  @Field(() => String)
  firstName: string;

  @Field(() => String)
  middleName: string;

  @Field(() => String)
  lastName: string;

  @Field(() => Date)
  birthday: Date;

  @Field(() => String)
  nationality: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  phone: string;

  @Field(() => String)
  passportFileId: string;
}
