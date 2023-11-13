import { UpdateQuestionInput } from 'src/domain/question/dtos/questions/update-question.input';

export class UpdateQuestionCommand {
  constructor(public readonly dto: UpdateQuestionInput) {}
}
