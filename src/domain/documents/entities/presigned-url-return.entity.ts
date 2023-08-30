import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PresignedUrlReturn {
  @Field()
  link: string;

  @Field()
  id: string;
}
