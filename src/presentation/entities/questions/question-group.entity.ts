import { Field, ObjectType } from '@nestjs/graphql';
import { QuestionEntity } from './question.entity';

@ObjectType()
export class QuestionGroupEntity {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field(() => [QuestionEntity], { nullable: true })
  Question?: QuestionEntity[];
}
