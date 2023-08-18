import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateCompensationInput {
  @Field(() => Int)
  totalCost: number;

  @Field(() => Int)
  gross: number;

  @Field(() => Int, { nullable: true })
  net: number;

  @Field(() => Int, { nullable: true })
  paymentsPerMonth: number;

  @Field()
  paymentType: string;

  @Field({ nullable: true })
  currency: string;

  @Field()
  employeeId: string;

  @Field(() => Date)
  startDate: Date;
}
