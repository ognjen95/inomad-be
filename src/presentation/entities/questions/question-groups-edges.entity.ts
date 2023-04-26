import { Field, Int, ObjectType } from '@nestjs/graphql';
import { QuestionGroupEntity } from './question-group.entity';
import { PageInfo } from '../edges.entity';

@ObjectType()
export class QuestionGroupsEdges {
  @Field()
  cursor: string;

  @Field(() => QuestionGroupEntity)
  node: QuestionGroupEntity;
}

@ObjectType()
export class QuestionGroupsEntityEdgesEntity {
  @Field(() => Int)
  totalCount: number;

  @Field(() => [QuestionGroupsEdges])
  edges: QuestionGroupsEdges[];

  @Field(() => PageInfo)
  pageInfo: PageInfo;
}
