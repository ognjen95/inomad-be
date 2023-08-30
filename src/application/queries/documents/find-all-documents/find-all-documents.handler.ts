import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindAllDocumentsQuery } from './find-all-documents.query';
import { Inject, UnauthorizedException } from '@nestjs/common';
import { DOCUMENTS_REPOSITORY_TOKEN } from 'src/application/common/constants/tokens';
import { UserRoles } from 'src/domain/user/enums';
import { IDocumentRepository } from 'src/application/common/interfaces/documents/documents-repository.interface';
import { Document } from 'src/domain/documents/document';
import { connectionFromArray } from 'graphql-relay/connection/arrayConnection';
import { Connection } from 'graphql-relay';

@QueryHandler(FindAllDocumentsQuery)
class FindAllDocumentsHandler implements IQueryHandler<FindAllDocumentsQuery> {
  constructor(
    @Inject(DOCUMENTS_REPOSITORY_TOKEN)
    private readonly documentRepository: IDocumentRepository,
  ) {}

  async execute({
    currentUser,
  }: FindAllDocumentsQuery): Promise<Connection<Document>> {
    if (
      currentUser.userRole === UserRoles.PROVIDER_SUPERVISOR ||
      currentUser.userRole === UserRoles.PROVIDER_EMPLOYEE
    ) {
      const documents = await this.documentRepository.findMany({
        providerCompanyId: currentUser.tenantId,
      });

      return connectionFromArray(documents, {});
    }

    if (currentUser.userRole === UserRoles.CUSTOMER) {
      const documents = await this.documentRepository.findMany({
        customerId: currentUser.userId,
        caseId: currentUser.applicationId,
      });

      return connectionFromArray(documents, {});
    }

    throw new UnauthorizedException('This user is unauthorized.');
  }
}

export default FindAllDocumentsHandler;
