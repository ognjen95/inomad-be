import { InputType, Field } from '@nestjs/graphql';
import { UserRoles } from '@domain/user/enums';
import { UpdateCaseFamilyInfoInput } from '../../case/dtos/update-family-info-input';

@InputType()
export class CreateUserInput {
  @Field()
  firstName: string;

  @Field({ nullable: true })
  middleName: string;

  @Field()
  lastName: string;

  @Field()
  email: string;

  @Field(() => UserRoles)
  userRole: UserRoles;

  @Field(() => Date)
  birthday?: Date;

  @Field()
  password: string;

  @Field({ nullable: true })
  companyId?: string;

  @Field()
  nationality: string;

  @Field()
  phone: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => UpdateCaseFamilyInfoInput, { nullable: true })
  familyInfo?: UpdateCaseFamilyInfoInput;
}
