import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetPresignedUrlQuery } from './get-presigned-url.query';
import { IFileServiceInterface } from 'src/application/common/interfaces/documents/file-upload-service.interface';
import { Inject } from '@nestjs/common';
import { FILE_SERVICE_TOKEN } from 'src/application/common/constants/tokens';
import { PresignedUrlReturn } from 'src/domain/documents/entities/presigned-url-return.entity';

@QueryHandler(GetPresignedUrlQuery)
class GetPresignedUrHandler implements IQueryHandler<GetPresignedUrlQuery> {
  constructor(
    @Inject(FILE_SERVICE_TOKEN)
    private readonly fileService: IFileServiceInterface,
  ) {}

  async execute({
    fileNames,
  }: GetPresignedUrlQuery): Promise<Array<PresignedUrlReturn>> {
    const LinkAndUrls = await this.fileService.getPresignedUrls(fileNames);

    return LinkAndUrls;
  }
}

export default GetPresignedUrHandler;
