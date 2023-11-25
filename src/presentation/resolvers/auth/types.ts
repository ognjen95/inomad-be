import { UserRoles } from '@domain/user/enums';

export type CurrentUserInfo = {
  userId: string;
  firstName: string;
  lastName: string;
  userRole: UserRoles;
  tenantId?: string;
  applicationId?: string;
};
