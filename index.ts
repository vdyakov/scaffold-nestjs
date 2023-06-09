#!/usr/bin/env node

import BaseModule from '@/generators/base/index.js';
import AuthModule from '@/generators/auth/index.js';
import ZodValidator from '@/lib/validators/zod-validator.js';
import DatabaseModule from '@/generators/database/index.js';
import ServicesModule from '@/generators/services/index.js';
import { OptionsObject } from '@/lib/options-managers/types.js';
import ModuleCollector from '@/lib/collectors/module-collector.js';
import OptionsManager from '@/lib/options-managers/options-manager.js';
import ModuleCollectorHandler from '@/lib/collectors/module-collector-handler.js';

async function init() {
  const optionsValidator = new ZodValidator(OptionsObject);
  const options = new OptionsManager(optionsValidator);
  const collector = new ModuleCollector();
  const collectorHandler = new ModuleCollectorHandler();

  const baseModule = new BaseModule();
  const authModule = new AuthModule();
  const databaseModule = new DatabaseModule();
  const servicesModule = new ServicesModule();

  collector.register(baseModule);
  collector.register(databaseModule);
  collector.register(authModule);
  collector.register(servicesModule);

  await collectorHandler.handle(collector, options);
}

init().catch((e) => {
  console.error(e);
});
