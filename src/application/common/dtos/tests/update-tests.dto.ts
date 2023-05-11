export class UpdateTestDto {
  id: string;
  name?: string;
  percentageToPass?: number;
  timeLimit?: number;
  employeeId?: string;
  startedAt?: Date;
  endsAt?: Date;
}
