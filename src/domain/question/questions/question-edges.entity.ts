import { Field, Int, ObjectType } from '@nestjs/graphql';
import { QuestionEntity } from './question.entity';
// import { PageInfo } from '../edges.entity';

@ObjectType()
export class QuestionEdges {
  @Field()
  cursor: string;
  @Field(() => QuestionEntity)
  node: QuestionEntity;
}

@ObjectType()
export class QuestionEntityEdgesEntity {
  @Field(() => Int)
  totalCount: number;

  @Field(() => [QuestionEdges])
  edges: QuestionEdges[];

  // @Field(() => PageInfo)
  // pageInfo: PageInfo;
}
