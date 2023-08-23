import { AggregateRoot } from '@nestjs/cqrs';
import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { CaseStatus } from './enums';
// import { CaseRequest } from '../case-request/case-request';

@ObjectType()
export class CaseEntity extends AggregateRoot {
  @Field()
  protected id: string;

  @Field(() => CaseStatus, { defaultValue: CaseStatus.UNASSIGNED })
  protected status: CaseStatus;

  @Field()
  protected name: string;

  // @Field((){ nullable: true })
  // protected caseRequests: CaseRequest[];

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
}

registerEnumType(CaseStatus, {
  name: 'CaseStatus',
});
