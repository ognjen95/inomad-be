import { EmploymentStatus } from '../enums';

export class UpdateUserDto {
  id: string;
  password?: string;
  employmentStatus?: EmploymentStatus;
}
