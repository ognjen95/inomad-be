import { CreateQuestionDto } from 'src/application/common/dtos/question/create-question.dto';

export class CreateQuestionCommand {
  constructor(public readonly dto: CreateQuestionDto) {}
}
