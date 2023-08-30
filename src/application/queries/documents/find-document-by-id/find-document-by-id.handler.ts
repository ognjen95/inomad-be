import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindDocumentByIdQuery } from './find-document-by-id.query';
import { Inject, UnauthorizedException } from '@nestjs/common';
import { DOCUMENTS_REPOSITORY_TOKEN } from 'src/application/common/constants/tokens';
import { UserRoles } from 'src/domain/user/enums';
import { IDocumentRepository } from 'src/application/common/interfaces/documents/documents-repository.interface';
import { Document } from 'src/domain/documents/document';

@QueryHandler(FindDocumentByIdQuery)
class FindDocumentByIdHandler implements IQueryHandler<FindDocumentByIdQuery> {
  constructor(
    @Inject(DOCUMENTS_REPOSITORY_TOKEN)
    private readonly documentRepository: IDocumentRepository,
  ) {}

  async execute({ id, currentUser }: FindDocumentByIdQuery): Promise<Document> {
    if (
      currentUser.userRole === UserRoles.PROVIDER_SUPERVISOR ||
      currentUser.userRole === UserRoles.PROVIDER_EMPLOYEE
    ) {
      const document = await this.documentRepository.findOneById(id, {
        providerCompanyId: currentUser.tenantId,
      });

      return document;
    }

    if (currentUser.userRole === UserRoles.CUSTOMER) {
      const document = await this.documentRepository.findOneById(id, {
        customerId: currentUser.tenantId,
      });

      return document;
    }

    throw new UnauthorizedException('This user is unauthorized.');
  }
}

export default FindDocumentByIdHandler;
