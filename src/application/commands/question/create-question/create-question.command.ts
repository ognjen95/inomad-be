import { CreateQuestionDto } from 'src/domain/question/dtos/create-question.dto';

export class CreateQuestionCommand {
  constructor(public readonly dto: CreateQuestionDto) {}
}
