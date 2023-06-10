import * as path from 'node:path';
import { fileURLToPath } from 'url';
import renderTemplate from '@/utils/render-template.js';
import { AuthAnswers } from '@/generators/auth/types';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function templatePath(...dest: string[]) {
  return path.resolve(__dirname, '..', 'templates', ...dest);
}

function destinationPath(projectName: string, ...dest: string[]) {
  return path.resolve(projectName, ...dest);
}

export default function (answers: AuthAnswers) {
  const {
    projectName = 'nest-js-project',
    needAuth = false,
    orm = 'prisma',
    database = 'mongo',
    auth = 'jwt',
  } = answers;

  if (!needAuth) {
    return;
  }

  renderTemplate(
    templatePath('base', database, orm),
    destinationPath(projectName),
    answers,
  );

  renderTemplate(
    templatePath(orm, auth),
    destinationPath(projectName),
    answers,
  );
};
