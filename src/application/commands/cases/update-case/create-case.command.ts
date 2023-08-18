import { CreateCaseInput } from 'src/domain/case/dtos/create-case.input';

export class CreateCaseCommand {
  constructor(public readonly dto: CreateCaseInput) {}
}
