import { UpdateQuestionDto } from 'src/application/common/dtos/question/update-question.dto';

export class UpdateQuestionCommand {
  constructor(public readonly dto: UpdateQuestionDto) {}
}
