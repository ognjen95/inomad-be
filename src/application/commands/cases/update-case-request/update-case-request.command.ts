import { UpdateCaseRequestInput } from '@domain/case-request/dto/update-case-request.input';
import { CurrentUserInfo } from '../../../../presentation/resolvers/auth/types';

export class UpdateCaseRequestCommand {
  constructor(
    public readonly currentUser: CurrentUserInfo,
    public readonly dto: UpdateCaseRequestInput,
  ) {}
}
