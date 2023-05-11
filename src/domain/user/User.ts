import { BadRequestException } from '@nestjs/common/exceptions/bad-request.exception';
import { AggregateRoot } from '@nestjs/cqrs';

export class User extends AggregateRoot {
  private id: string;
  constructor(
    private firstName: string,
    private lastName: string,
    private email: string,
    private password: string,
    private employmentStatus: 'employed' | 'interviewing' | 'archived',
    private createdAt?: Date,
  ) {
    super();
  }

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

  get getEmploymentStatus() {
    return this.employmentStatus;
  }

  set setEmploymentStatus(
    employmentStatus: 'employed' | 'interviewing' | 'archived',
  ) {
    this.employmentStatus = employmentStatus;
  }

  updateUser = (data: {
    password?: string;
    employmentStatus?: 'employed' | 'interviewing' | 'archived';
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
}
