import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AuthReturn {
  @Field()
  accessToken: string;

  @Field()
  refreshToken: string;

  @Field()
  idToken: string;
}
