import Generator from '@/lib/generator.js';
import generatorSteps from '@/generators/services/generator/steps/index.js';
import { ServicesAnswers } from '@/generators/services/types';

export default class BaseGenerator extends Generator<ServicesAnswers> {
  protected start() {
    generatorSteps.start();
  }

  protected async writing(answers: ServicesAnswers) {
    await generatorSteps.writing(answers);
  }

  protected async install(answers: ServicesAnswers) {
    await generatorSteps.install(answers);
  }

  protected end(answers: ServicesAnswers) {
    generatorSteps.end(answers);
  }
}
