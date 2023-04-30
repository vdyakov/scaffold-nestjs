import { NpmPackageManager } from '@/lib/package-managers/npm-package-manager.js';
import { ServicesAnswers } from '@/generators/services/types';

export default async function (answers: ServicesAnswers) {
  const { projectName } = answers;

  const manager = new NpmPackageManager();

  await manager.install(projectName);
};
