import Generator from '@/lib/generator.js';
import generatorSteps from '@/generators/base/generator/steps/index.js';
import { CommonAnswers } from '@/generators/base/types';

export default class BaseGenerator extends Generator<CommonAnswers> {
  protected start(answers: CommonAnswers) {
    generatorSteps.start(answers);
  }

  protected async writing(answers: CommonAnswers) {
    await generatorSteps.writing(answers);
  }

  protected async install(answers: CommonAnswers) {
    await generatorSteps.install(answers);
  }

  protected end() {
    generatorSteps.end();
  }
}
