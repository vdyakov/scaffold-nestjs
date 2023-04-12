import ModuleCollector from '@/lib/collectors/module-collector.js';

export default class ModuleCollectorHandler {
  private answers: object = [];

  public async handle(moduleCollector: ModuleCollector) {
    for (const questionnaire of moduleCollector.questionnaires()) {
      const answers = await questionnaire.prompt();

      this.answers = { ...this.answers, ...answers };
    }

    for (const generator of moduleCollector.generators()) {
      await generator.generate(this.answers);
    }
  }
}
