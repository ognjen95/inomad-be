import { CreateCompensationDto } from './dtos/create-compensation.dto';

export class Compensation {
  private id: string;
  private totalCost: number;
  private gross: number;
  private net: number;
  private paymentsPerMonth: number;
  private paymentType: string;
  private currency: string;
  private employeeId: string;
  private startDate: Date;

  constructor(dto: CreateCompensationDto) {
    this.totalCost = dto.totalCost;
    this.gross = dto.gross;
    this.net = dto.net;
    this.paymentsPerMonth = dto.paymentsPerMonth;
    this.paymentType = dto.paymentType;
    this.currency = dto.currency;
    this.employeeId = dto.employeeId;
    this.startDate = dto.startDate;
  }

  get getId(): string {
    return this.id;
  }

  set setId(id: string) {
    this.id = id;
  }

  get getTotalCost(): number {
    return this.totalCost;
  }

  set setTotalCost(totalCost: number) {
    this.totalCost = totalCost;
  }

  get getGross(): number {
    return this.gross;
  }

  set setGross(gross: number) {
    this.gross = gross;
  }

  get getNet(): number {
    return this.net;
  }

  set setNet(net: number) {
    this.net = net;
  }

  get getPaymentsPerMonth(): number {
    return this.paymentsPerMonth;
  }

  set setPaymentsPerMonth(paymentsPerMonth: number) {
    this.paymentsPerMonth = paymentsPerMonth;
  }

  get getPaymentType(): string {
    return this.paymentType;
  }

  set setPaymentType(paymentType: string) {
    this.paymentType = paymentType;
  }

  get getCurrency(): string {
    return this.currency;
  }

  set setCurrency(currency: string) {
    this.currency = currency;
  }

  get getEmployeeId(): string {
    return this.employeeId;
  }

  set setEmployeeId(employeeId: string) {
    this.employeeId = employeeId;
  }

  get getStartDate(): Date {
    return this.startDate;
  }

  set setStartDate(startDate: Date) {
    this.startDate = startDate;
  }
}
