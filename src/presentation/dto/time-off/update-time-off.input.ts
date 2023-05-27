import { CreateTimeOffInput } from './create-time-off.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTimeOffInput extends PartialType(CreateTimeOffInput) {
  @Field()
  timeOffId: string;

  @Field({ nullable: true })
  employeeId?: string;

  @Field({ nullable: true })
  name?: string;

  @Field(() => Int, { nullable: true })
  forYear?: number;

  @Field(() => Int, { nullable: true })
  totalDays?: number;

  @Field(() => Int, { nullable: true })
  usedDays?: number;

  @Field(() => Int, { nullable: true })
  remainingDays?: number;

  @Field(() => Int, { nullable: true })
  approvedDays?: number;
}
