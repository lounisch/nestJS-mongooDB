/* eslint-disable prettier/prettier */

import { QuestionDto } from "./question.dto";

export interface QuizDto {
  name: string;
  description: string;
  updatedDate: Date;
  timeAllowed: number;
  questions: QuestionDto[];
}
