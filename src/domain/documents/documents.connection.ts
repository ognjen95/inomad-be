import { Field } from '@nestjs/graphql/dist/decorators/field.decorator';
import { ObjectType } from '@nestjs/graphql/dist/decorators/object-type.decorator';
import {
  Connection as RelayConnection,
  Edge as RelayEdge,
  PageInfo as RelayPageInfo,
} from 'graphql-relay';
import { Int } from '@nestjs/graphql';
import { PageInfo } from '@domain/common/page-info.entity';
import { DocumentEntity } from './document.entity';
import { Document } from './document';

@ObjectType()
class DocumentEdges implements RelayEdge<DocumentEntity> {
  @Field(() => DocumentEntity, { nullable: false })
  node: Document;

  @Field(() => String, { nullable: false })
  cursor: string;
}

@ObjectType()
export class DocumentConnection implements RelayConnection<DocumentEntity> {
  @Field(() => [DocumentEdges], { nullable: false })
  edges: Array<RelayEdge<Document>>;

  @Field(() => PageInfo, { nullable: false })
  pageInfo: RelayPageInfo;

  @Field(() => Int, { nullable: false })
  totalCount: number;
}
