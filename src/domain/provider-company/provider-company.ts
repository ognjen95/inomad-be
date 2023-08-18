import { User } from '../user/user';
import { Case } from '../case/case';
import { ProviderCompanyEntity } from './provider-company.entity';

export class ProviderCompany extends ProviderCompanyEntity {
  constructor(name: string, email: string, website: string) {
    super();

    this.name = name;
    this.email = email;
    this.website = website;
  }

  get getId() {
    return this.id;
  }

  set setId(id: string) {
    if (!id) return;
    this.id = id;
  }

  get getName() {
    return this.name;
  }

  set setName(name: string) {
    if (!name) return;

    this.name = name;
  }

  get getEmail() {
    return this.email;
  }

  set setEmail(email: string) {
    if (!email) return;

    this.email = email;
  }

  get getRating() {
    return this.rating;
  }

  set setRating(rating: number) {
    if (!rating) return;

    this.rating = rating;
  }

  get getCreatedAt() {
    return this.createdAt;
  }

  get getUpdatedAt() {
    return this.updatedAt;
  }

  set setUpdatedAt(updatedAt: Date) {
    if (!updatedAt) return;

    this.updatedAt = new Date();
  }

  get getEmployees() {
    return this.employees;
  }

  set setEmployees(employees: User[]) {
    if (!employees) return;

    this.employees = employees;
  }

  get getCases() {
    return this.cases;
  }

  set setCases(cases: Case[]) {
    if (!cases) return;

    this.cases = cases;
  }

  get getWebsite() {
    return this.website;
  }

  set setWebsite(website: string) {
    if (!website) return;

    this.website = website;
  }
}
