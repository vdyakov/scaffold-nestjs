import BaseQuestionnaire from '@/generators/base/questionnaire/index.js';
import { CommonAnswers } from '@/generators/base/types';

export default function (): Promise<CommonAnswers> {
  const questions = new BaseQuestionnaire();

  return questions.prompt();
};
