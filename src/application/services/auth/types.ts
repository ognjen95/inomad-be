import { UserRoles } from '@domain/user/enums';

export type DecodedToken = {
  exp: number;
  userRole: UserRoles;
  userId?: string;
};
