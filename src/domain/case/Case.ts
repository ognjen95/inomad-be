import { CaseStatus } from './enums';
import { BadRequestException } from '@nestjs/common/exceptions/bad-request.exception';
import { UpdateCaseInput } from './dtos/update-case.input';
import { CaseEntity } from './case.entity';

export class Case extends CaseEntity {
  constructor(
    name: string,
    applicantsIds: string[],
    isPrivate: boolean,
    employeesIds: string[],
    providersIds: string[],
  ) {
    super();

    this.name = name;
    this.applicantsIds = applicantsIds;
    this.isPrivate = isPrivate;
    this.employeesIds = employeesIds;
    this.providersIds = providersIds;
  }

  update(dto: UpdateCaseInput) {
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
