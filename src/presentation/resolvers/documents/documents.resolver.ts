import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CreateDocumentInput } from '../../../domain/documents/dto/create-document.input';
import { UpdateDocumentInput } from '../../../domain/documents/dto/update-document.input';
import { IsPublic } from 'src/presentation/decorators/is-public';
import { PresignedUrlReturn } from '../../../domain/documents/entities/presigned-url-return.entity';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetPresignedUrlQuery } from 'src/application/queries/documents/get-presigned-url/get-presigned-url.query';
import { GetDownloadUrlQuery } from 'src/application/queries/documents/get-download-url/get-download-url.query';
import { CurrentUser } from 'src/presentation/decorators/current-user';
import { CurrentUserInfo } from '../auth/types';
import { DocumentEntity } from 'src/domain/documents/document.entity';
import { CreateDocumentCommand } from 'src/application/commands/documents/create-document/create-document.command';
import { MutationReturn } from 'src/application/common/return-dtos/mutation-return-dt0';
import { DocumentConnection } from 'src/domain/documents/documents.connection';
import { FindAllDocumentsQuery } from 'src/application/queries/documents/find-all-documents/find-all-documents.query';
import { Document } from 'src/domain/documents/document';
import { FindDocumentByIdQuery } from 'src/application/queries/documents/find-document-by-id/find-document-by-id.query';
import { UpdateDocumentCommand } from 'src/application/commands/documents/update-document/update-document.command';

@Resolver(() => DocumentEntity)
export class DocumentsResolver {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Query(() => [PresignedUrlReturn], { nullable: 'items' })
  async presignedUrl(
    @Args('fileNames', {
      type: () => [String],
    })
    fileNames: string[],
  ) {
    return await this.queryBus.execute<
      GetPresignedUrlQuery,
      PresignedUrlReturn
    >(new GetPresignedUrlQuery(fileNames));
  }

  @Query(() => String)
  async downloadLink(
    @Args('id') id: string,
    @CurrentUser() user: CurrentUserInfo,
  ) {
    return await this.queryBus.execute<GetDownloadUrlQuery, string>(
      new GetDownloadUrlQuery(id, user),
    );
  }

  @Query(() => DocumentConnection)
  async documents(@CurrentUser() user: CurrentUserInfo) {
    return await this.queryBus.execute<FindAllDocumentsQuery, Document>(
      new FindAllDocumentsQuery(user),
    );
  }

  @Query(() => DocumentEntity, { name: 'document' })
  findOne(@Args('id') id: string, @CurrentUser() user: CurrentUserInfo) {
    return this.queryBus.execute<FindDocumentByIdQuery, DocumentEntity>(
      new FindDocumentByIdQuery(id, user),
    );
  }

  @Mutation(() => MutationReturn)
  createDocument(
    @Args('args') args: CreateDocumentInput,
    @CurrentUser() user: CurrentUserInfo,
  ) {
    return this.commandBus.execute<CreateDocumentCommand, DocumentEntity>(
      new CreateDocumentCommand(args, user),
    );
  }

  @Mutation(() => MutationReturn)
  updateDocument(
    @CurrentUser() user: CurrentUserInfo,
    @Args('args') args: UpdateDocumentInput,
  ) {
    return this.commandBus.execute<UpdateDocumentCommand, DocumentEntity>(
      new UpdateDocumentCommand(args, user),
    );
  }
}
