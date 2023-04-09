import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'url';
import { CommonAnswers } from '@/types/common';
import { clearDir } from '@/utils/file-system.js';
import renderTemplate from '@/utils/render-template.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function templatePath(...dest: string[]) {
  return path.resolve(__dirname, '..', 'templates', ...dest);
}

function destinationPath(projectName: string, ...dest: string[]) {
  return path.resolve(projectName, ...dest);
}

export default function (answers: CommonAnswers) {
  const {
    projectName,
    packageName = projectName,
    shouldOverwrite = false,
  } = answers;

  const root = destinationPath(projectName);

  console.log(`\nScaffolding project in ${root}...`);

  if (fs.existsSync(root) && shouldOverwrite) {
    clearDir(root);
  } else if (!fs.existsSync(root)) {
    fs.mkdirSync(root);
  }

  renderTemplate(
    templatePath(),
    destinationPath(projectName),
    { projectName, packageName, shouldOverwrite },
  );
};
