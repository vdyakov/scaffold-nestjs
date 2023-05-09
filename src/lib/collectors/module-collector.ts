import AbstractModule from '@/lib/module.js';
import AbstractGenerator from '@/lib/generator.js';
import AbstractQuestionnaire from '@/lib/questionnaire.js';

export default class ModuleCollector {
  private modules: AbstractModule<{}>[] = [];

  public register(module: AbstractModule<{}>) {
    this.modules.push(module);
  }

  public *questionnaires(): Generator<AbstractQuestionnaire> {
    for (const module of this.modules) {
      yield module.questionnaire;
    }
  }

  public *generators(): Generator<AbstractGenerator> {
    for (const module of this.modules) {
      yield module.generator;
    }
  }
}
