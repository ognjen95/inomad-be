import { CaseStatus } from '../enums';

export class UpdateCaseDto {
  id: string;

  name?: string;

  isPrivate?: boolean;

  employeesIds?: string[];

  providersIds?: string[];

  applicantsIds?: string[];

  status?: CaseStatus;

  providerCompanyId?: string;

  employerCompanyId?: string;
}
