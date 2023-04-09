#!/usr/bin/env node

import Builder from '@/lib/builders/builder.js';
import AppGenerator from '@/generators/app/index.js';

async function init() {
  const builder = new Builder();
  const appGenerator = new AppGenerator();

  builder.addGenerator(appGenerator);

  await builder.build();
}

init().catch((e) => {
  console.error(e);
});
