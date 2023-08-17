import { Field, InputType } from '@nestjs/graphql';
import { UserQueryOptions } from 'src/domain/user/dtos/user-query-options';

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
export class UserQueryOptionsInput implements UserQueryOptions {
  @Field({ nullable: true })
  userId: string;

  @Field(() => UserWhereInput)
  where?: UserWhereInput;
}
