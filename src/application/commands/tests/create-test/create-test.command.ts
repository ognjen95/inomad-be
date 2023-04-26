import { CreateTestDto } from 'src/application/common/dtos/tests/create-tests.dto';

export class CreateTestCommand {
  constructor(public readonly dto: CreateTestDto) {}
}
