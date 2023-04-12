import { NpmPackageManager } from '@/lib/package-managers/npm-package-manager.js';
import { CommonAnswers } from '@/generators/base/types';

export default async function (answers: CommonAnswers) {
  const { projectName } = answers;

  const manager = new NpmPackageManager();

  await manager.install(projectName);
};
