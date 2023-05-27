import { CreateTestDto } from 'src/domain/test/dtos/create-tests.dto';

export class CreateTestCommand {
  constructor(public readonly dto: CreateTestDto) {}
}
