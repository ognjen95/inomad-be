export class UpdateTimeOffRequestDto {
  id: string;

  approvedAt?: Date;

  declinedAt?: Date;

  approvedById?: string;
}
