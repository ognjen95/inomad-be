import { Field, InputType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';
import { UserRoles } from '../user/enums';

@InputType()
export class EmployeeStatusFilterInput {
  @IsOptional()
  @Field({ nullable: true })
  eq?: string;

  @IsOptional()
  @Field({ nullable: true })
  contains?: string;

  @IsOptional()
  @Field({ nullable: true })
  not?: string;

  @IsOptional()
  @Field(() => [String], { nullable: true })
  in?: string[];
}

@InputType()
export class FilterInput {
  @IsOptional()
  @Field({ nullable: true })
  eq?: string;

  @IsOptional()
  @Field({ nullable: true })
  contains?: string;

  @IsOptional()
  @Field(() => EmployeeStatusFilterInput, { nullable: true })
  employeeStatus?: EmployeeStatusFilterInput;

  @IsOptional()
  @Field({ nullable: true })
  providerCompanyId?: string;

  @IsOptional()
  @Field(() => [UserRoles], { nullable: true })
  userRoles: UserRoles;
}
