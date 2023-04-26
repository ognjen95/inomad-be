import { CreateQuestionGroupDto } from 'src/application/common/dtos/question/create-question-group.dto';

export class CreateQuestionGroupCommand {
  constructor(public readonly dto: CreateQuestionGroupDto) {}
}
