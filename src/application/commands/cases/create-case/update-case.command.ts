import { UpdateCaseDto } from 'src/domain/case/dtos/update-case-dto';

export class UpdateCaseCommand {
  constructor(public readonly dto: UpdateCaseDto) {}
}
