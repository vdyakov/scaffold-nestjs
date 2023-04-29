import * as path from 'node:path';
import { fileURLToPath } from 'url';
import renderTemplate from '@/utils/render-template.js';
import { DatabaseAnswers } from '@/generators/database/types';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function templatePath(...dest: string[]) {
  return path.resolve(__dirname, '..', 'templates', ...dest);
}

function destinationPath(projectName: string, ...dest: string[]) {
  return path.resolve(projectName, ...dest);
}

export default function (answers: DatabaseAnswers) {
  const {
    projectName,
    database,
    orm,
    odm,
  } = answers;

  renderTemplate(
    templatePath(database, orm ?? odm ?? ''),
    destinationPath(projectName),
    answers,
  );
};
