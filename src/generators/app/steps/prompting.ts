import AppQuestions from '@/generators/app/questions/index.js';
import { CommonAnswers } from '@/types/common';

export default function (): Promise<CommonAnswers> {
  const questions = new AppQuestions();

  return questions.prompt<CommonAnswers>();
};
