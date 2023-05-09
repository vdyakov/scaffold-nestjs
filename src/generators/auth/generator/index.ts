import Generator from '@/lib/generator.js';
import generatorSteps from '@/generators/auth/generator/steps/index.js';
import { AuthAnswers } from '@/generators/auth/types';

export default class AuthGenerator extends Generator<AuthAnswers> {
  protected start() {
    generatorSteps.start();
  }

  protected async writing(answers: AuthAnswers) {
    await generatorSteps.writing(answers);
  }

  protected async install() {
    await generatorSteps.install();
  }

  protected end() {
    generatorSteps.end();
  }
}
