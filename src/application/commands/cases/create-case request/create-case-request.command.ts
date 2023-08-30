export class CreateCaseRequestCommand {
  constructor(
    public readonly userId: string,
    public readonly caseId: string,
    public readonly providerCompanyId: string,
  ) {}
}
