import { CommonAnswers } from '@/types/common';
import { NpmPackageManager } from '@/lib/package-managers/npm-package-manager.js';

export default async function (answers: CommonAnswers) {
  const { projectName } = answers;

  const manager = new NpmPackageManager();

  await manager.install(projectName);
};
