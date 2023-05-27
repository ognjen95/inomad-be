import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateTimeOffRequestInput {
  @Field()
  timeOffId: string;

  @Field(() => Date, { nullable: true })
  startDate: Date;

  @Field(() => Date, { nullable: true })
  endDate: Date;

  @Field()
  reason: string;

  @Field()
  requestedById: string;
}
