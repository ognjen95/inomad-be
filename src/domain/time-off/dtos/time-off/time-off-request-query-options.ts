import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class TimeOffRequestQueryOptions {
  @Field({ nullable: true })
  public readonly requestedById?: string;

  @Field({ nullable: true })
  public readonly approvedById?: string;

  @Field({ nullable: true })
  public readonly timeOffId?: string;

  @Field({ nullable: true })
  public readonly isApproved?: boolean;

  @Field({ nullable: true })
  public readonly isDeclined?: boolean;
}
