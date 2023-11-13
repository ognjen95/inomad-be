import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetDownloadUrlQuery } from './get-download-url.query';
import { IFileServiceInterface } from 'src/application/common/interfaces/documents/file-upload-service.interface';
import {
  Inject,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import {
  DOCUMENTS_REPOSITORY_TOKEN,
  FILE_SERVICE_TOKEN,
} from 'src/application/common/constants/tokens';
import { UserRoles } from 'src/domain/user/enums';
import { IDocumentRepository } from 'src/application/common/interfaces/documents/documents-repository.interface';

@QueryHandler(GetDownloadUrlQuery)
class GetDownloadUrlHandler implements IQueryHandler<GetDownloadUrlQuery> {
  constructor(
    @Inject(FILE_SERVICE_TOKEN)
    private readonly fileService: IFileServiceInterface,

    @Inject(DOCUMENTS_REPOSITORY_TOKEN)
    private readonly documentRepository: IDocumentRepository,
  ) {}

  async execute({
    id,
    user: currentUser,
  }: GetDownloadUrlQuery): Promise<string> {
    return this.fileService.getDownloadLink(id);

    return;
    const document = await this.documentRepository.findOneById(id);

    if (!document) {
      throw new NotFoundException('Document not found.');
    }

    const fileId = document.getFileId;

    if (
      currentUser.tenantId &&
      currentUser.tenantId === document.getProviderCompanyId
    ) {
      return this.fileService.getDownloadLink(fileId);
    }

    if (
      currentUser.userRole === UserRoles.CUSTOMER &&
      currentUser.userId === document.getCustomerId
    ) {
      return this.fileService.getDownloadLink(fileId);
    }

    throw new UnauthorizedException('This user is unauthorized.');
  }
}

export default GetDownloadUrlHandler;
