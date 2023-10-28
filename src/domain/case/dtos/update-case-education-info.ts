import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateCaseEducationInfoInput {
  @Field(() => String)
  id: string;

  @Field(() => String)
  degree: string;

  @Field(() => String)
  university: string;

  @Field(() => String)
  diplomaFileId: string;

  @Field(() => String)
  confirmationLetterFileId: string;
}
