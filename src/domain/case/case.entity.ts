import { AggregateRoot } from '@nestjs/cqrs';
import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { ApplicantFamilyMembers, CaseStatus } from './enums';
import { UserEntity } from '../user/user.entity';
import { Document } from '../documents/document';
import { DocumentEntity } from '../documents/document.entity';
// import { CaseRequest } from '../case-request/case-request';
@ObjectType()
export class GeneralInfo {
  @Field({ nullable: true })
  firstName: string;

  @Field({ nullable: true })
  middleName: string;

  @Field({ nullable: true })
  lastName: string;

  @Field(() => Date, { nullable: true })
  birthday: Date;

  @Field({ nullable: true })
  email: string;

  @Field({ nullable: true })
  phone: string;

  @Field({ nullable: true })
  nationality: string;

  @Field({ nullable: true })
  passportFileId: string;
}

@ObjectType()
export class EducationInfo {
  @Field({ nullable: true })
  degree: string;

  @Field({ nullable: true })
  university: string;

  @Field({ nullable: true })
  diplomaFileId: string;

  @Field({ nullable: true })
  confirmationLetterFileId: string;
}

@ObjectType()
export class WorkInfo {
  @Field({ nullable: true })
  contractType: string;

  @Field({ nullable: true })
  contractFileId: string;

  @Field({ nullable: true })
  jobTitle: string;

  @Field({ nullable: true })
  yearsOfExperience: string;

  @Field(() => Int, { nullable: true })
  monthlyIncome: number;

  @Field({ nullable: true })
  cvFileId: string;

  @Field(() => [String], { nullable: true })
  invoicesFilesIds: Array<string>;
}

@ObjectType()
export class Partner {
  @Field({ nullable: true })
  married: boolean;

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  middleName: string;

  @Field({ nullable: true })
  lastName: string;

  @Field(() => Date, { nullable: true })
  birthday: Date;
}

registerEnumType(ApplicantFamilyMembers, {
  name: 'ApplicantFamilyMembers',
});

@ObjectType()
export class Child {
  @Field({ nullable: true })
  married: boolean;

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  middleName: string;

  @Field({ nullable: true })
  lastName: string;

  @Field(() => Date, { nullable: true })
  birthday: Date;
}

@ObjectType()
export class FamilyInfo {
  @Field(() => ApplicantFamilyMembers, { nullable: true })
  familyMembers: ApplicantFamilyMembers;

  @Field(() => Partner, { nullable: true })
  spouse: Partner;

  @Field(() => [Child], { nullable: true })
  children: Array<Child>;
}

@ObjectType()
export class CaseEntity extends AggregateRoot {
  @Field()
  protected id: string;

  @Field(() => CaseStatus, { defaultValue: CaseStatus.UNASSIGNED })
  protected status: CaseStatus;

  @Field()
  protected name: string;

  @Field(() => GeneralInfo, { nullable: true })
  protected generalInfo: GeneralInfo;

  @Field(() => EducationInfo, { nullable: true })
  protected education: EducationInfo;

  @Field(() => WorkInfo, { nullable: true })
  protected workInfo: WorkInfo;

  @Field(() => FamilyInfo, { nullable: true })
  protected familyInfo: FamilyInfo;

  @Field(() => [String], { nullable: true })
  protected documentsIds: Array<string>;

  @Field(() => [DocumentEntity], { nullable: true })
  protected documents: Array<Document>;

  @Field(() => [String])
  protected applicantsIds: Array<string>;

  @Field({ nullable: true, defaultValue: false })
  protected isPrivate: boolean;

  @Field(() => [String], { nullable: true, defaultValue: [] })
  protected employeesIds: Array<string>;

  @Field(() => [String], { nullable: true, defaultValue: [] })
  protected providersIds: Array<string>;

  @Field({ nullable: true })
  protected providerCompanyId: string;

  @Field({ nullable: true })
  protected employerCompanyId: string;

  @Field(() => Date, { defaultValue: new Date() })
  protected createdAt: Date;

  @Field(() => Date, { defaultValue: new Date() })
  protected updatedAt: Date;

  @Field(() => [UserEntity], { nullable: true })
  protected applicants: UserEntity[];

  @Field(() => [UserEntity], { nullable: true })
  protected providers: UserEntity[];

  @Field(() => [UserEntity], { nullable: true })
  protected employees: UserEntity[];
}

registerEnumType(CaseStatus, {
  name: 'CaseStatus',
});
