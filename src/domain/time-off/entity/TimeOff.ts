import { BadRequestException } from '@nestjs/common';
import { UpdateTimeOffDto } from '../dtos/update-time-off.dto';

export class TimeOff {
  private id: string;

  private usedDays: number;

  private remainingDays: number;

  private pendingDays: number;

  private employeeId: string | null;

  constructor(
    private name: string,

    private forYear: number,

    private totalDays: number,
  ) {
    this.remainingDays = totalDays;
    this.pendingDays = 0;
    this.usedDays = 0;
  }

  public update(dto: UpdateTimeOffDto) {
    Object.keys(dto).forEach((key) => {
      const value = dto[key];
      if (value && this[key]) {
        this[key] = value;
      }
    });

    if (dto.approvedDays) {
      if (dto.approvedDays > this.remainingDays) {
        throw new BadRequestException("You don't have enough remaining days ");
      }

      this.usedDays += dto.approvedDays;
      this.remainingDays -= dto.approvedDays;
      this.totalDays -= dto.approvedDays;
      this.pendingDays -= dto.approvedDays;
    }
  }

  public get getId(): string {
    return this.id;
  }

  public set setId(id: string) {
    this.id = id;
  }

  public get getUsedDays(): number {
    return this.usedDays;
  }

  public set setUsedDays(usedDays: number) {
    this.usedDays = usedDays;
  }

  public get getRemainingDays(): number {
    return this.remainingDays;
  }

  public set setRemainingDays(remainingDays: number) {
    this.remainingDays = remainingDays;
  }

  public get getEmployeeId(): string {
    return this.employeeId;
  }

  public set setEmployeeId(employeeId: string) {
    this.employeeId = employeeId;
  }

  public get getPendingDays(): number {
    return this.pendingDays;
  }

  public set setPendingDays(pendingDays: number) {
    this.pendingDays = pendingDays;
  }

  public get getName(): string {
    return this.name;
  }

  public set setName(name: string) {
    this.name = name;
  }

  public get getForYear(): number {
    return this.forYear;
  }

  public set setForYear(forYear: number) {
    this.forYear = forYear;
  }

  public get getTotalDays(): number {
    return this.totalDays;
  }

  public set setTotalDays(totalDays: number) {
    this.totalDays = totalDays;
  }
}
