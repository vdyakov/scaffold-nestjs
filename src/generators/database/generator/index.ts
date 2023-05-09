import Generator from '@/lib/generator.js';
import generatorSteps from '@/generators/database/generator/steps/index.js';
import { DatabaseAnswers } from '@/generators/database/types';

export default class BaseGenerator extends Generator<DatabaseAnswers> {
  protected start() {
    generatorSteps.start();
  }

  protected async writing(answers: DatabaseAnswers) {
    await generatorSteps.writing(answers);
  }

  protected async install() {
    await generatorSteps.install();
  }

  protected end() {
    generatorSteps.end();
  }
}
