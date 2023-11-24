import { CaseStatus } from './enums';
import { BadRequestException } from '@nestjs/common/exceptions/bad-request.exception';
import { UpdateCaseInput } from './dtos/update-case.input';
import {
  CaseEntity,
  EducationInfo,
  FamilyInfo,
  GeneralInfo,
  WorkInfo,
} from './case.entity';
import { User } from '../user/user';
import { Document } from '../documents/document';
import { UpdateCaseGeneralInfoInput } from './dtos/update-case-general-info';
import { UpdateCaseEducationInfoInput } from './dtos/update-case-education-info';
import { plainToInstance } from 'class-transformer';

export class Case extends CaseEntity {
  constructor(
    name: string,
    applicantsIds: string[] = [],
    isPrivate: boolean,
    employeesIds: string[] = [],
    providersIds: string[] = [],
  ) {
    super();

    this.name = name;
    this.applicantsIds = applicantsIds;
    this.isPrivate = isPrivate;
    this.employeesIds = employeesIds;
    this.providersIds = providersIds;
  }

  updateGeneralInfo(dto: UpdateCaseGeneralInfoInput) {
    this.generalInfo = dto;
  }

  updateEducationInfo(dto: UpdateCaseEducationInfoInput) {
    this.education = dto;
  }

  updateWorkInfo(dto: WorkInfo) {
    this.workInfo = dto;
  }

  updateFamilyInfo(dto: FamilyInfo) {
    this.familyInfo = dto;
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

    this.status = status;
  }

  get getGeneralInfo(): GeneralInfo {
    return this.generalInfo;
  }

  set setGeneralInfo(generalInfo: GeneralInfo) {
    if (!generalInfo) return;

    this.generalInfo = generalInfo;
  }

  get getEducationInfo(): EducationInfo {
    return this.education;
  }

  set setEducationInfo(educationInfo: EducationInfo) {
    if (!educationInfo) return;

    this.education = educationInfo;
  }

  get getWorkInfo(): WorkInfo {
    return this.workInfo;
  }

  set setWorkInfo(workInfo: WorkInfo) {
    if (!workInfo) return;

    this.workInfo = workInfo;
  }

  get getFamilyInfo() {
    return this.familyInfo;
  }

  set setFamilyInfo(familyInfo: FamilyInfo) {
    if (!familyInfo) return;

    this.familyInfo = familyInfo;
  }

  get getDocumentsIds() {
    return this.documentsIds;
  }

  set setDocumentsIds(documentsIds: string[]) {
    if (!documentsIds) return;

    this.documentsIds = documentsIds;
  }

  get getDocuments() {
    return plainToInstance(Document, this.documents);
  }

  set setDocuments(documents: Document[]) {
    if (!documents) return;

    this.documents = documents;
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

  get getEmployees() {
    return this.employees;
  }

  set setEmployees(employees: User[]) {
    if (!employees) return;
  }

  get getProvidersIds() {
    return this.providersIds;
  }

  set setProvidersIds(providersIds: string[]) {
    if (!providersIds) return;

    providersIds.forEach((providerId) => {
      if (this.providersIds.includes(providerId)) return;

      this.providersIds.push(providerId);
    });
  }

  get getApplicantsIds() {
    return this.applicantsIds;
  }

  set setApplicantsIds(applicantsIds: string[]) {
    if (!applicantsIds) return;

    this.applicantsIds = applicantsIds;
  }

  get getApplicants() {
    return this.applicants;
  }

  set setApplicants(applicants: User[]) {
    if (!applicants) return;
  }

  get getProviderCompanyId() {
    return this.providerCompanyId;
  }

  set setProviderCompanyId(providerCompanyId: string) {
    if (!providerCompanyId) return;

    if (this.providerCompanyId) {
      throw new BadRequestException(
        'This case is already assigned to a provider',
      );
    }

    this.providerCompanyId = providerCompanyId;
  }

  get getEmployerCompanyId() {
    return this.employerCompanyId;
  }

  set setEmployerCompanyId(employerCompanyId: string) {
    if (!employerCompanyId) return;

    this.employerCompanyId = employerCompanyId;
  }

  get getProviders() {
    return this.providers;
  }

  set setProviders(providers: User[]) {
    if (!providers) return;

    providers.forEach((provider) => {
      if (this.providers.includes(provider)) return;

      this.providers.push(provider);
    });
  }
}
