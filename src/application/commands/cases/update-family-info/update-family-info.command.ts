import { UpdateCaseFamilyInfoInput } from '@domain/case/dtos/update-family-info-input';

export class UpdateFamilyInfoCommand {
  constructor(public readonly dto: UpdateCaseFamilyInfoInput) {}
}
