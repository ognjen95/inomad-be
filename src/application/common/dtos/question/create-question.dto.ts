import { Answer } from 'src/domain/question/Question';

export class CreateQuestionDto {
  text: string;

  points: number;

  answers?: Answer[];

  questionGroup: string;
}
