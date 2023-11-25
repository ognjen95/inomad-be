import { UpdateCaseEducationInfoInput } from '@domain/case/dtos/update-case-education-info';

export class UpdateCaseEducationInfoCommand {
  constructor(public readonly dto: UpdateCaseEducationInfoInput) {}
}
