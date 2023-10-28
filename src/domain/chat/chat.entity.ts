import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Chat {
  @Field()
  token: string;

  @Field()
  userId: string;
}
