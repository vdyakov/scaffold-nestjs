import Module from '@/lib/module.js';
import Generator from '@/generators/database/generator/index.js';
import Questionnaire from '@/generators/database/questionnaire/index.js';
import { DatabaseAnswers } from '@/generators/database/types';

export default class DatabaseModule extends Module<DatabaseAnswers> {
  public get generator(): Generator {
    return new Generator();
  }

  public get questionnaire(): Questionnaire {
    return new Questionnaire();
  }
}
