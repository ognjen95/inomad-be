import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class MutationReturn {
  @Field()
  isCompleted: boolean;

  @Field({ nullable: true, defaultValue: null })
  error?: string;

  @Field({ nullable: true, defaultValue: null })
  errorMsg?: string;
}
