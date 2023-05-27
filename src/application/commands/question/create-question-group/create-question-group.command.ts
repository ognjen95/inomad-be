import { CreateQuestionGroupDto } from 'src/domain/question/dtos/create-question-group.dto';

export class CreateQuestionGroupCommand {
  constructor(public readonly dto: CreateQuestionGroupDto) {}
}
