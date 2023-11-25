import { UpdateCaseRequestInput } from '@domain/case-request/dto/update-case-request.input';

export class UpdateCaseRequestCommand {
  constructor(
    public readonly userId: string,
    public readonly dto: UpdateCaseRequestInput,
  ) {}
}
