export class UpdateTimeOffDto {
  timeOffId: string;
  employeeId?: string;
  name?: string;
  forYear?: number;
  totalDays?: number;
  usedDays?: number;
  remainingDays?: number;
  approvedDays?: number;
}
