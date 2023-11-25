import { UpdateQuestionInput } from '@domain/question/dtos/questions/update-question.input';

export class UpdateQuestionCommand {
  constructor(public readonly dto: UpdateQuestionInput) {}
}
