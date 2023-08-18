import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateTimeOffRequestInput {
  @Field()
  id: string;

  @Field(() => Date, { nullable: true })
  approvedAt: Date;

  @Field(() => Date, { nullable: true })
  declinedAt: Date;

  @Field()
  approvedBy: string;
}
