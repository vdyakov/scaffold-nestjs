import Generator from '@/lib/builders/generator.js';
import generatorSteps from '@/generators/app/steps/index.js';
import { CommonAnswers } from '@/types/common';

export default class AppGenerator extends Generator<CommonAnswers> {
  protected start() {
    generatorSteps.start();
  }

  protected async prompting(): Promise<CommonAnswers> {
    return generatorSteps.prompting();
  }

  protected async writing() {
    await generatorSteps.writing(this.answers);
  }

  protected async install() {
    await generatorSteps.install(this.answers);
  }

  protected end() {
    generatorSteps.end();
  }
}
