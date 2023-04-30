import Module from '@/lib/module.js';
import Generator from '@/generators/services/generator/index.js';
import Questionnaire from '@/generators/services/questionnaire/index.js';
import { ServicesAnswers } from '@/generators/services/types';

export default class ServicesModule extends Module<ServicesAnswers> {
  public get generator(): Generator {
    return new Generator();
  }

  public get questionnaire(): Questionnaire {
    return new Questionnaire();
  }
}
