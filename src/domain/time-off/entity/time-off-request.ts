import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class TimeOffRequestEntity {
  @Field()
  id: string;

  @Field(() => Date, { nullable: true })
  startDate: Date;

  @Field(() => Date, { nullable: true })
  endDate: Date;

  @Field(() => Date, { nullable: true })
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  approvedAt: Date;

  @Field(() => Date, { nullable: true })
  declinedAt: Date;

  @Field()
  reason: string;

  @Field()
  requestedById: string;

  @Field({ nullable: true })
  approvedById: string;

  @Field()
  timeOffId: string;
}
