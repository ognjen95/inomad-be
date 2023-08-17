import { BadRequestException } from '@nestjs/common/exceptions/bad-request.exception';
import { AggregateRoot } from '@nestjs/cqrs';
import { TimeOff } from '../time-off/TimeOff';
import { EmploymentStatus, UserRoles } from './enums';

export class User extends AggregateRoot {
  private id: string;

  private timeOff?: TimeOff[];

  private employmentStatus: EmploymentStatus = EmploymentStatus.PENDING;

  // private createdAt: Date = new Date();

  constructor(
    private firstName: string,
    private middleName: string,
    private lastName: string,
    private email: string,
    private password: string,
    private userRole: UserRoles,
  ) {
    super();
  }

  updateUser = (data: {
    password?: string;
    employmentStatus?: EmploymentStatus;
    id: string;
  }) => {
    const { password, employmentStatus } = data || {};

    if (password) {
      if (password === this.password) {
        throw new BadRequestException('Password is the same as the old one');
      }

      this.password = password;
    }

    if (employmentStatus) {
      if (employmentStatus === this.employmentStatus) {
        throw new BadRequestException(
          'Employee already has this employment status',
        );
      }

      this.employmentStatus = employmentStatus;
    }
  };

  get getId() {
    return this.id;
  }

  set setId(id: string) {
    this.id = id;
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

  get getEmploymentStatus() {
    return this.employmentStatus;
  }

  set setEmploymentStatus(employmentStatus: EmploymentStatus) {
    this.employmentStatus = employmentStatus;
  }

  // get getCreatedAt() {
  //   return this.createdAt;
  // }

  // set setCreatedAt(createdAt: Date) {
  //   this.createdAt = createdAt;
  // }

  get getTimeOff(): TimeOff[] {
    return this.timeOff;
  }

  set setTimeOff(timeOffs: TimeOff[]) {
    this.timeOff = timeOffs;
  }
}
