import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field()
  id: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  employmentStatus: 'employed' | 'interviewing' | 'archived';

  @Field(() => Date, { nullable: true })
  createdAt?: Date;
}
