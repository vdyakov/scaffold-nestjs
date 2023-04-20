import BaseModule from '@/generators/base/index.js';
import DatabaseModule from '@/generators/database/index.js';
import ModuleCollector from '@/lib/collectors/module-collector.js';
import ModuleCollectorHandler from '@/lib/collectors/module-collector-handler.js';

async function init() {
  const collector = new ModuleCollector();
  const collectorHandler = new ModuleCollectorHandler();

  const baseModule = new BaseModule();
  const databaseModule = new DatabaseModule();

  collector.register(baseModule);
  collector.register(databaseModule);

  await collectorHandler.handle(collector);
}

init().catch((e) => {
  console.error(e);
});
