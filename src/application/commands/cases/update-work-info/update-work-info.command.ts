import { UpdateCaseWorkInfoInput } from 'src/domain/case/dtos/update-case-work-info';

export class UpdateCaseWorkInfoCommand {
  constructor(public readonly dto: UpdateCaseWorkInfoInput) {}
}
