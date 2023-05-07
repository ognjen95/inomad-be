import { UpdateTestDto } from 'src/application/common/dtos/tests/update-tests.dto';

export class UpdateTestCommand {
  constructor(public readonly dto: UpdateTestDto) {}
}
