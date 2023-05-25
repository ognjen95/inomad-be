import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User as UserEntity } from '../user.entity';

@ObjectType()
export class TimeOffEntity {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field(() => Int)
  forYear: number;

  @Field(() => Int)
  totalDays: number;

  @Field(() => Int)
  usedDays: number;

  @Field(() => Int)
  pendingDays: number;

  @Field(() => Int)
  remainingDays: number;

  @Field({ nullable: true })
  employeeId: string;

  @Field(() => UserEntity, { nullable: true })
  employee: UserEntity;
}
