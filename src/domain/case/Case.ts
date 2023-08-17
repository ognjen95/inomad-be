import { AggregateRoot } from '@nestjs/cqrs/dist/aggregate-root';
import { CaseStatus } from './enums';
import { BadRequestException } from '@nestjs/common/exceptions/bad-request.exception';
import { UpdateCaseDto } from './dtos/update-case-dto';

export class Case extends AggregateRoot {
  private id: string;

  private status: CaseStatus = CaseStatus.UNASSIGNED;

  private createdAt: Date = new Date();

  private updatedAt: Date = new Date();

  private providerCompanyId = '';

  private employerCompanyId = '';

  constructor(
    private name: string,

    private applicantsIds: string[],

    private isPrivate: boolean,

    private employeesIds: string[],

    private providersIds: string[],
  ) {
    super();
  }

  update(dto: UpdateCaseDto) {
    this.setName = dto.name;
    this.setIsPrivate = !!dto.isPrivate;
    this.setEmployeesIds = dto.employeesIds;
    this.setProvidersIds = dto.providersIds;
    this.setApplicantsIds = dto.applicantsIds;
    this.setStatus = dto.status;
    this.setProviderCompanyId = dto.providerCompanyId;
    this.setEmployerCompanyId = dto.employerCompanyId;
    this.setUpdatedAt = new Date();
  }

  get getId() {
    return this.id;
  }

  set setId(id: string) {
    this.id = id;
  }

  get getName() {
    return this.name;
  }

  set setName(name: string) {
    if (!name) return;

    this.name = name;
  }

  get getStatus(): CaseStatus {
    return this.status;
  }

  set setStatus(status: CaseStatus) {
    if (!status) return;

    if (!this.providerCompanyId) {
      throw new BadRequestException(
        'There is no applicant or assigned provider for this case',
      );
    }

    this.status = status;
  }

  get getCreatedAt() {
    return this.createdAt;
  }

  get getUpdatedAt() {
    return this.updatedAt;
  }

  set setUpdatedAt(updatedAt: Date) {
    if (!updatedAt) return;

    this.updatedAt = updatedAt;
  }

  get getIsPrivate() {
    return this.isPrivate;
  }

  set setIsPrivate(isPrivate: boolean) {
    this.isPrivate = isPrivate;
  }

  get getEmployeesIds() {
    if (!this.employeesIds) return;

    return this.employeesIds;
  }

  set setEmployeesIds(employeesIds: string[]) {
    if (!employeesIds) return;

    this.employeesIds = employeesIds;
  }

  get getProvidersIds() {
    return this.providersIds;
  }

  set setProvidersIds(providersIds: string[]) {
    if (!providersIds) return;

    this.providersIds = providersIds;
  }

  get getApplicantsIds() {
    return this.applicantsIds;
  }

  set setApplicantsIds(applicantsIds: string[]) {
    if (!applicantsIds) return;

    this.applicantsIds = applicantsIds;
  }

  get getProviderCompanyId() {
    return this.providerCompanyId;
  }

  set setProviderCompanyId(providerCompanyId: string) {
    if (!providerCompanyId) return;

    this.providerCompanyId = providerCompanyId;
  }

  get getEmployerCompanyId() {
    return this.employerCompanyId;
  }

  set setEmployerCompanyId(employerCompanyId: string) {
    if (!employerCompanyId) return;

    this.employerCompanyId = employerCompanyId;
  }
}
