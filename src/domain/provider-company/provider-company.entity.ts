import { AggregateRoot } from '@nestjs/cqrs/dist/aggregate-root';
import { Field } from '@nestjs/graphql/dist/decorators/field.decorator';
import { ObjectType } from '@nestjs/graphql/dist/decorators/object-type.decorator';
import { Int } from '@nestjs/graphql/dist/scalars';
import { CaseEntity } from '../case/case.entity';
import { UserEntity } from '../user/user.entity';
import { Case } from '../case/case';
import { User } from '../user/user';

@ObjectType()
export class ProviderCompanyEntity extends AggregateRoot {
  @Field()
  protected id: string;

  @Field(() => Int, { defaultValue: 0 })
  protected rating: number;

  @Field(() => Date)
  protected createdAt: Date = new Date();

  @Field(() => Date)
  protected updatedAt: Date = new Date();

  @Field(() => [UserEntity], { defaultValue: [] })
  protected employees: User[];

  @Field(() => [CaseEntity], { defaultValue: [] })
  protected cases: Case[];

  @Field({ nullable: true })
  protected website: string;

  @Field()
  protected name: string;

  @Field()
  protected email: string;
}
