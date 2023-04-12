import Module from '@/lib/module.js';
import Generator from '@/generators/base/generator/index.js';
import Questionnaire from '@/generators/base/questionnaire/index.js';
import { CommonAnswers } from '@/generators/base/types';

export default class BaseModule extends Module<CommonAnswers> {
  public get generator(): Generator {
    return new Generator();
  }

  public get questionnaire(): Questionnaire {
    return new Questionnaire();
  }
}
