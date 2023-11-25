import { UpdateCaseInput } from '@domain/case/dtos/update-case.input';

export class UpdateCaseCommand {
  constructor(public readonly dto: UpdateCaseInput) {}
}
