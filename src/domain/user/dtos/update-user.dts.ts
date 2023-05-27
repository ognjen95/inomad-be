export class UpdateUserDto {
  id: string;
  password?: string;
  employmentStatus?: 'employed' | 'interviewing' | 'archived';
}
