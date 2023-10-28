import { Field, InputType, registerEnumType } from '@nestjs/graphql';
import { ApplicantFamilyMembers } from '../enums';

@InputType()
export class PartnerInput {
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

@InputType()
export class ChildInput {
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

@InputType()
export class UpdateCaseFamilyInfoInput {
  @Field(() => String)
  id: string;

  @Field(() => ApplicantFamilyMembers, { nullable: true })
  familyMembers: ApplicantFamilyMembers;

  @Field(() => PartnerInput, { nullable: true })
  spouse: PartnerInput;

  @Field(() => [ChildInput], { nullable: true })
  children: Array<ChildInput>;
}
