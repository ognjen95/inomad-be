import { UpdateCaseFamilyInfoInput } from 'src/domain/case/dtos/update-family-info-input';

export class UpdateFamilyInfoCommand {
  constructor(public readonly dto: UpdateCaseFamilyInfoInput) {}
}
