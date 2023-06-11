import ModuleCollector from '@/lib/collectors/module-collector.js';
import OptionsManager from '@/lib/options-managers/options-manager.js';
import { Options } from '@/lib/options-managers/types';

export default class ModuleCollectorHandler {
  public async handle(moduleCollector: ModuleCollector, argvManager: OptionsManager) {
    const options: Options = argvManager.options;

    const answers = false === options.interactive
      ? options
      : await this.getAnswers(moduleCollector, options);

    for (const generator of moduleCollector.generators()) {
      await generator.generate(answers, options);
    }
  }

  private async getAnswers(moduleCollector: ModuleCollector, options: Options) {
    let allAnswers = {};

    for (const questionnaire of moduleCollector.questionnaires()) {
      const answers = await questionnaire.prompt(options);

      allAnswers = { ...allAnswers, ...answers };
    }

    return allAnswers;
  }
}
