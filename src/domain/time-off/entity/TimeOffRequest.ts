export class TimeOffRequest {
  private id: string;

  private createdAt: Date;

  private approvedAt: Date;

  private declinedAt: Date;

  private approvedById: string;

  constructor(
    private timeOffId: string,

    private startDate: Date,

    private endDate: Date,

    private reason: string,

    private requestedById: string,
  ) {}

  public get getId(): string {
    return this.id;
  }

  public set setId(id: string) {
    this.id = id;
  }

  public get getStartDate(): Date {
    return this.startDate;
  }

  public set setStartDate(startDate: Date) {
    this.startDate = startDate;
  }

  public get getEndDate(): Date {
    return this.endDate;
  }

  public set setEndDate(endDate: Date) {
    this.endDate = endDate;
  }

  public get getCreatedAt(): Date {
    return this.createdAt;
  }

  public set setCreatedAt(createdAt: Date) {
    this.createdAt = createdAt;
  }

  public get getApprovedAt(): Date {
    return this.approvedAt;
  }

  public set setApprovedAt(approvedAt: Date) {
    this.approvedAt = approvedAt;
  }

  public get getDeclinedAt(): Date {
    return this.declinedAt;
  }

  public set setDeclinedAt(declinedAt: Date) {
    this.declinedAt = declinedAt;
  }

  public get getReason(): string {
    return this.reason;
  }

  public set setReason(reason: string) {
    this.reason = reason;
  }

  public get getRequestedById(): string {
    return this.requestedById;
  }

  public set setRequestedById(requestedById: string) {
    this.requestedById = requestedById;
  }

  public get getApprovedById(): string {
    return this.approvedById;
  }

  public set setApprovedById(approvedById: string) {
    this.approvedById = approvedById;
  }

  public get getTimeOffId(): string {
    return this.timeOffId;
  }

  public set setTimeOffId(timeOffId: string) {
    this.timeOffId = timeOffId;
  }
}
