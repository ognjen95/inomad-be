export class CreateCaseDto {
  name: string;

  isPrivate?: boolean;

  employeesIds?: string[];

  providersIds?: string[];

  applicantsIds?: string[];
}
