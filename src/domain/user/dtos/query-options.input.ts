import { Field, InputType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';
import { UserRoles } from '../enums';

@InputType()
export class ApplicantsIdsInput {
  @Field()
  hasSome?: string;
}

@InputType()
export class UserWhereInput {
  @Field(() => ApplicantsIdsInput)
  applicationId?: ApplicantsIdsInput;
}

@InputType()
export class UserQueryOptionsInput {
  @Field({ nullable: true })
  userId: string;

  @Field(() => UserWhereInput, { nullable: true })
  where?: UserWhereInput;

  @IsOptional()
  @Field({ nullable: true })
  providerCompanyId?: string;

  @IsOptional()
  @Field(() => [UserRoles], { nullable: true })
  userRoles?: UserRoles[];
}
