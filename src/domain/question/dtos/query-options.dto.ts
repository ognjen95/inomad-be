import { UserRoles } from 'src/domain/user/enums';

export class Pagination {
  take?: number;

  skip?: number;

  cursor?: string;

  orderBy?: 'asc' | 'desc';
}

class EmployeeStatus {
  eq?: string;
  not?: string;
  contains?: string;
  in?: string[];
}

export class Filters {
  eq?: string;
  contains?: string;
  employeeStatus?: EmployeeStatus;
}

export class QueryOptions {
  filters?: Filters;
  userRoles?: UserRoles[];
  providerCompanyId?: string;
  pagination?: Pagination;
}
