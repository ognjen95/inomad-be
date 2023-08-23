import { CreateCaseRequestInput } from 'src/domain/case-request/dto/create-case-request.input';

export class CreateCaseRequestCommand {
  constructor(public readonly dto: CreateCaseRequestInput) {}
}
