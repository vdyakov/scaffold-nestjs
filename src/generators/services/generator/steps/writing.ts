import * as path from 'node:path';
import { fileURLToPath } from 'url';
import renderModule from '@/utils/render-module.js';
import renderTemplate from '@/utils/render-template.js';
import { ServicesAnswers } from '@/generators/services/types';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function templatePath(...dest: string[]) {
  return path.resolve(__dirname, '..', 'templates', ...dest);
}

function destinationPath(projectName: string, ...dest: string[]) {
  return path.resolve(projectName, ...dest);
}

export default function (answers: ServicesAnswers) {
  const {
    projectName,
    needKeycloak,
    needNovu,
    needMinio,
  } = answers;

  const providerImports = [];
  const providers = [];

  if (needKeycloak) {
    providerImports.push({ serviceName: 'KeycloakService', fileName: 'keycloak.service.ts' });
    providers.push('KeycloakService');

    renderTemplate(
      templatePath('keycloak'),
      destinationPath(projectName),
      answers,
    );
  }

  if (needNovu) {
    providerImports.push({ serviceName: 'NovuService', fileName: 'novu.service.ts' });
    providers.push('NovuService');

    renderTemplate(
      templatePath('novu'),
      destinationPath(projectName),
      answers,
    );
  }

  if (needMinio) {
    providerImports.push({ serviceName: 'MinioService', fileName: 'minio.service.ts' });
    providers.push('MinioService');

    renderTemplate(
      templatePath('minio'),
      destinationPath(projectName),
      answers,
    );
  }

  renderModule(
    templatePath('base/shared/shared.module.ejs'),
    destinationPath(projectName, 'src/shared'),
    'shared.module.ts',
    { providerImports, providers }
  )
};
