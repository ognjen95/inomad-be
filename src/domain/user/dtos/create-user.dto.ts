export class CreateUserDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  employmentStatus: 'employed' | 'interviewing' | 'archived';
}
