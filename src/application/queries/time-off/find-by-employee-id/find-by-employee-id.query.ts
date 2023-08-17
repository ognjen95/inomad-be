export class FindByEmployeeIdQuery {
  constructor(readonly employeeId: string, readonly forYear?: number) {}
}
