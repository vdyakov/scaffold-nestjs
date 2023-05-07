import Module from '@/lib/module.js';
import Generator from '@/generators/auth/generator/index.js';
import Questionnaire from '@/generators/auth/questionnaire/index.js';
import { AuthAnswers } from '@/generators/auth/types';

export default class AuthModule extends Module<AuthAnswers> {
  public get generator(): Generator {
    return new Generator();
  }

  public get questionnaire(): Questionnaire {
    return new Questionnaire();
  }
}
