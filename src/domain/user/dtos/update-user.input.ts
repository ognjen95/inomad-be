import { CreateUserInput } from './create-user.input';
import {
  InputType,
  Field,
  PartialType,
  registerEnumType,
} from '@nestjs/graphql';
import { EmploymentStatus, UserRoles } from '../enums';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field()
  id: string;

  @Field({ nullable: true })
  providerCompanyId: string;

  @Field({ nullable: true })
  password: string;

  @Field(() => EmploymentStatus, { nullable: true })
  employmentStatus: EmploymentStatus;

  @Field({ nullable: true })
  firstName: string;

  @Field({ nullable: true })
  middleName: string;

  @Field({ nullable: true })
  lastName: string;

  @Field({ nullable: true })
  email: string;

  @Field(() => UserRoles, { nullable: true })
  userRole: UserRoles;
}

registerEnumType(EmploymentStatus, {
  name: 'EmploymentStatus',
});

registerEnumType(UserRoles, {
  name: 'UserRoles',
});
