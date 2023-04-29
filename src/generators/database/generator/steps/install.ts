import { NpmPackageManager } from '@/lib/package-managers/npm-package-manager.js';
import { DatabaseAnswers } from '@/generators/database/types';

export default async function (answers: DatabaseAnswers) {
  const { projectName } = answers;

  const manager = new NpmPackageManager();

  await manager.install(projectName);
};
