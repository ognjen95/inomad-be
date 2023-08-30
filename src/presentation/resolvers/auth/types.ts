import { UserRoles } from 'src/domain/user/enums';

export type CurrentUserInfo = {
  userId: string;
  userRole: UserRoles;
  tenantId?: string;
  applicationId?: string;
};
