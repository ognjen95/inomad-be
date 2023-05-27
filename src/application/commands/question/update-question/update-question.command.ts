import { UpdateQuestionDto } from 'src/domain/question/dtos/update-question.dto';

export class UpdateQuestionCommand {
  constructor(public readonly dto: UpdateQuestionDto) {}
}
