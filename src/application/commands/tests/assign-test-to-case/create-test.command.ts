import { CreateTestInput } from 'src/domain/test/dtos/tests/create-test.input';
import { CurrentUserInfo } from 'src/presentation/resolvers/auth/types';

export class CreateTestCommand {
  constructor(
    public readonly dto: CreateTestInput,
    public readonly currentUser: CurrentUserInfo,
  ) {}
}
