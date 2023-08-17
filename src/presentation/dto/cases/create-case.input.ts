import { InputType, Field } from '@nestjs/graphql';
import { CreateCaseDto } from 'src/domain/case/dtos/crete-case-dto';

@InputType()
export class CreateCaseInput implements CreateCaseDto {
  @Field()
  name: string;

  @Field({ nullable: true, defaultValue: false })
  isPrivate?: boolean;

  @Field(() => [String], { nullable: true, defaultValue: [] })
  employeesIds: string[];

  @Field(() => [String], { nullable: true, defaultValue: [] })
  providersIds: Array<string>;

  @Field(() => [String])
  applicantsIds: string[];
}
