import { AggregateRoot } from '@nestjs/cqrs/dist/aggregate-root';
import { Field } from '@nestjs/graphql/dist/decorators/field.decorator';
import { ObjectType } from '@nestjs/graphql/dist/decorators/object-type.decorator';
import { EmploymentStatus, UserRoles } from '../enums';
import { TimeOff } from '../../time-off/entity/TimeOff';
import { registerEnumType } from '@nestjs/graphql/dist/type-factories/register-enum-type.factory';
import { User } from './user';

@ObjectType()
export class UserEntity extends AggregateRoot {
  @Field()
  protected id: string;

  @Field()
  protected externalId: string;

  @Field()
  protected firstName: string;

  @Field({ nullable: true })
  protected middleName: string;

  @Field()
  protected lastName: string;

  @Field()
  protected email: string;

  @Field()
  protected caseId: string;

  protected password: string;

  @Field(() => UserRoles)
  protected userRole: UserRoles;

  @Field({ nullable: true })
  protected providerCompanyId?: string;

  @Field(() => [String], { nullable: true })
  protected applicationIds: string[];

  @Field(() => [String], { nullable: true })
  protected providerCassesIds: string[];

  @Field(() => Date, { nullable: true })
  protected birthday: Date;

  protected timeOff?: TimeOff[];

  @Field(() => EmploymentStatus, { defaultValue: EmploymentStatus.PENDING })
  protected employmentStatus: EmploymentStatus;

  @Field(() => Date)
  protected createdAt: Date = new Date();

  @Field(() => [UserEntity], { nullable: true, defaultValue: [] })
  protected family: User;
}

registerEnumType(EmploymentStatus, {
  name: 'EmploymentStatus',
});

registerEnumType(UserRoles, {
  name: 'UserRoles',
});
