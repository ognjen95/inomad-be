import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateCaseWorkInfoInput {
  @Field(() => String)
  id: string;

  @Field({ nullable: true })
  contractType: string;

  @Field({ nullable: true })
  contractFileId: string;

  @Field({ nullable: true })
  jobTitle: string;

  @Field({ nullable: true })
  yearsOfExperience: string;

  @Field(() => Int, { nullable: true })
  monthlyIncome: number;

  @Field({ nullable: true })
  cvFileId: string;

  @Field(() => [String], { nullable: true })
  invoicesFilesIds: Array<string>;
}
