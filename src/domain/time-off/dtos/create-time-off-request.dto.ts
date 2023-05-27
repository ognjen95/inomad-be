export class CreateTimeOffRequestDto {
  timeOffId: string;

  startDate: Date;

  endDate: Date;

  reason: string;

  requestedById: string;
}
