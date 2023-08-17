import { CaseStatus } from 'src/domain/case/enums';
import { CreateCaseInput } from './create-case.input';
import {
  InputType,
  Field,
  PartialType,
  registerEnumType,
} from '@nestjs/graphql';
import { UpdateCaseDto } from 'src/domain/case/dtos/update-case-dto';

@InputType()
export class UpdateCaseInput
  extends PartialType(CreateCaseInput)
  implements UpdateCaseDto
{
  @Field(() => String)
  id: string;

  @Field(() => CaseStatus, { nullable: true })
  status: CaseStatus;

  @Field(() => String, { nullable: true })
  providerCompanyId: string;

  @Field(() => String, { nullable: true })
  employerCompanyId: string;
}

registerEnumType(CaseStatus, {
  name: 'CaseStatus',
});
