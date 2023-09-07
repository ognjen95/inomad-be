import { BadRequestException } from '@nestjs/common/exceptions/bad-request.exception';
import { TimeOff } from '../time-off/TimeOff';
import { EmploymentStatus, UserRoles } from './enums';
import { UpdateUserInput } from './dtos/update-user.input';
import { UserEntity } from './user.entity';

export class User extends UserEntity {
  constructor(
    firstName: string,
    middleName: string,
    lastName: string,
    email: string,
    password: string,
    userRole: UserRoles,
    providerCompanyId?: string,
  ) {
    super();

    this.firstName = firstName;
    this.middleName = middleName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.userRole = userRole;
    this.providerCompanyId = providerCompanyId;
  }

  updateUser = (dto: UpdateUserInput) => {
    this.setPassword = dto.password;
    this.setEmploymentStatus = dto.employmentStatus;
    this.setProviderCompanyId = dto.providerCompanyId;
  };

  get getId() {
    return this.id;
  }

  set setId(id: string) {
    this.id = id;
  }

  get getExternalId() {
    return this.externalId;
  }

  set setExternalId(externalId: string) {
    this.externalId = externalId;
  }

  get getFirstName() {
    return this.firstName;
  }

  set setFirstName(firstName: string) {
    this.firstName = firstName;
  }

  get getMiddleName() {
    return this.middleName;
  }

  set setMiddleName(middleName: string) {
    this.middleName = middleName;
  }

  get getLastName() {
    return this.lastName;
  }

  set setLastName(lastName: string) {
    this.lastName = lastName;
  }

  get getEmail() {
    return this.email;
  }

  set setEmail(email: string) {
    this.email = email;
  }

  get getPassword() {
    return this.password;
  }

  set setPassword(password: string) {
    this.password = password;
  }

  get getUserRole() {
    return this.userRole;
  }

  set setUserRole(userRole: UserRoles) {
    this.userRole = userRole;
  }

  get getApplicationIds() {
    return this.applicationIds;
  }

  set setApplicationIds(applicationIds: string[]) {
    if (!applicationIds) return;
    this.applicationIds = applicationIds;
  }

  get getEmploymentStatus() {
    return this.employmentStatus;
  }

  set setEmploymentStatus(employmentStatus: EmploymentStatus) {
    if (!employmentStatus) return;
    this.employmentStatus = employmentStatus;
  }

  get getCreatedAt() {
    return this.createdAt;
  }

  get getTimeOff(): TimeOff[] {
    return this.timeOff;
  }

  set setTimeOff(timeOffs: TimeOff[]) {
    this.timeOff = timeOffs;
  }

  get getBirthday() {
    return this.birthday;
  }

  set setBirthday(birthday: Date) {
    if (!birthday) return;
    this.birthday = birthday;
  }

  get getProviderCompanyId() {
    return this.providerCompanyId;
  }

  set setProviderCompanyId(providerCompanyId: string) {
    if (
      this.userRole !== UserRoles.PROVIDER_EMPLOYEE &&
      this.userRole !== UserRoles.PROVIDER_SUPERVISOR
    )
      throw new BadRequestException(
        'Only provider employee can have provider company',
      );

    if (this.providerCompanyId)
      throw new BadRequestException('User already has provider company');

    this.providerCompanyId = providerCompanyId;
  }

  get getProviderCasesIds() {
    return this.providerCassesIds;
  }

  set setProviderCasesIds(providerCasesIds: string[]) {
    if (!providerCasesIds) return;
    providerCasesIds.forEach((providerCaseId) => {
      if (this.providerCassesIds.includes(providerCaseId)) return;

      this.providerCassesIds.push(providerCaseId);
    });
  }
}
