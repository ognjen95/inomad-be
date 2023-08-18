import { InputType, Field } from '@nestjs/graphql';
import { UserRoles } from 'src/domain/user/enums';

@InputType()
export class CreateUserInput {
  @Field()
  firstName: string;

  @Field({ nullable: true })
  middleName: string;

  @Field()
  lastName: string;

  @Field()
  email: string;

  @Field(() => UserRoles)
  userRole: UserRoles;

  @Field()
  password: string;
}
