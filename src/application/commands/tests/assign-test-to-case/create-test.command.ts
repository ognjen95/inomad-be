import { CreateTestInput } from '@domain/test/dtos/tests/create-test.input';
import { CurrentUserInfo } from '@presentation/resolvers/auth/types';

export class CreateTestCommand {
  constructor(
    public readonly dto: CreateTestInput,
    public readonly currentUser: CurrentUserInfo,
  ) {}
}
