import { UpdateCaseGeneralInfoInput } from '@domain/case/dtos/update-case-general-info';

export class UpdateCaseGeneralInfoCommand {
  constructor(public readonly dto: UpdateCaseGeneralInfoInput) {}
}
