import { CreateCaseDto } from 'src/domain/case/dtos/crete-case-dto';

export class CreateCaseCommand {
  constructor(public readonly dto: CreateCaseDto) {}
}
