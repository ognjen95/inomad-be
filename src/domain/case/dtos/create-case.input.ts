import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateCaseInput {
  @Field()
  name: string;

  @Field({ nullable: true, defaultValue: false })
  isPrivate?: boolean;

  @Field(() => [String], { nullable: true, defaultValue: [] })
  employeesIds: string[];

  @Field(() => [String], { nullable: true, defaultValue: [] })
  providersIds: Array<string>;

  @Field(() => [String])
  applicantsIds: string[];
}
