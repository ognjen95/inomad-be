import { InputType, Field } from '@nestjs/graphql';
import { CreateUserDto } from 'src/domain/user/dtos/create-user.dto';
import { UserRoles } from 'src/domain/user/enums';

@InputType()
export class CreateUserInput implements CreateUserDto {
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
