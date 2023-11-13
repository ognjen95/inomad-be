import { ForbiddenException } from '@nestjs/common/exceptions/forbidden.exception';
import { UserRoles } from '../user/enums';
import { CaseRequestEntity } from './case-request.entity';
import { CaseRequestStatus } from './enums';
import { User } from '../user/user';

export class CaseRequest extends CaseRequestEntity {
  constructor(applicantId: string, providerCompanyId: string, caseId: string) {
    super();

    this.applicantId = applicantId;
    this.providerCompanyId = providerCompanyId;
    this.caseId = caseId;
  }

  updateCaseRequestStatus(user: User, status: CaseRequestStatus) {
    if (
      user.getUserRole === UserRoles.CUSTOMER &&
      status === CaseRequestStatus.CANCELED &&
      this.status === CaseRequestStatus.PENDING
    ) {
      this.status = status;
    } else if (
      user.getUserRole === UserRoles.PROVIDER_SUPERVISOR &&
      user.getProviderCompanyId === this.providerCompanyId
    ) {
      this.status = status;
    } else {
      throw new ForbiddenException(
        'You have no permission to change the status',
      );
    }
  }

  get getId(): string {
    return this.id;
  }

  set setId(id: string) {
    if (!id) return;
    this.id = id;
  }

  get getApplicantId(): string {
    return this.applicantId;
  }

  set setApplicantId(applicantId: string) {
    if (!applicantId) return;
    this.applicantId = applicantId;
  }

  get getProviderCompanyId(): string {
    return this.providerCompanyId;
  }

  set setProviderCompanyId(providerCompanyId: string) {
    if (!providerCompanyId) return;
    this.providerCompanyId = providerCompanyId;
  }

  get getStatus(): CaseRequestStatus {
    return this.status;
  }

  set setStatus(status: CaseRequestStatus) {
    if (!status) return;
    this.status = status;
  }

  get getCaseId(): string {
    return this.caseId;
  }

  set setCaseId(caseId: string) {
    if (!caseId) return;
    this.caseId = caseId;
  }

  get getCreatedAt(): Date {
    return this.createdAt;
  }

  get getUpdatedAt(): Date {
    return this.updatedAt;
  }

  set setUpdatedAt(updatedAt: Date) {
    if (!updatedAt) return;
    this.updatedAt = updatedAt;
  }

  get getCaseRequest(): CaseRequestEntity {
    return this;
  }

  get getDeadline(): Date {
    return this.deadline;
  }

  set setDeadline(deadline: Date) {
    if (!deadline) return;
    this.deadline = deadline;
  }

  get getIsProposal(): boolean {
    return this.isProposal;
  }

  set setIsProposal(isProposal: boolean) {
    if (!isProposal) return;
    this.isProposal = isProposal;
  }

  get getTotalCost(): number {
    return this.totalCost;
  }

  set setTotalCost(totalCost: number) {
    if (!totalCost) return;
    this.totalCost = totalCost;
  }
}
