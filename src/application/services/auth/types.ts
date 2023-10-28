import { UserRoles } from 'src/domain/user/enums';

export type DecodedToken = {
  exp: number;
  userRole: UserRoles;
  userId?: string;
};
