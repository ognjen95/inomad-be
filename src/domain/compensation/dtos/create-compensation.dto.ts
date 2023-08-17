export class CreateCompensationDto {
  totalCost: number;
  gross: number;
  net: number;
  paymentsPerMonth: number;
  paymentType: string;
  currency: string;
  employeeId: string;
  startDate: Date;
}
