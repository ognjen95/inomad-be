import { UserRoles } from '../enums';

export class CreateUserDto {
  firstName: string;

  middleName: string;

  lastName: string;

  email: string;

  password: string;

  userRole: UserRoles;
}
