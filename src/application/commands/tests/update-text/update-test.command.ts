import { UpdateTestDto } from 'src/domain/test/dtos/update-tests.dto';

export class UpdateTestCommand {
  constructor(public readonly dto: UpdateTestDto) {}
}
