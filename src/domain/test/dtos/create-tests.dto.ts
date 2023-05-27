export class CreateTestDto {
  name: string;
  questionIds: string[];
  percentageToPass: number;
  timeLimit?: number;
  employeeId?: string;
}
