import minimist from 'minimist';
import { PromptObject } from 'prompts';
import Questions from '@/lib/builders/questions.js';
import { canSkipEmptying } from '@/utils/file-system.js';
import { isValidPackageName } from '@/utils/validators.js';
import { toValidPackageName } from '@/utils/formatter.js';

export default class AppQuestions extends Questions {
  get questions(): PromptObject[] {
    const argv = minimist(process.argv.slice(2), {
      string: ['_'],
      boolean: true,
    });

    let targetDir: string = argv._[0];
    const forceOverwrite = argv.force;
    const defaultProjectName = !targetDir ? 'nest-js-project' : targetDir;

    return [
      {
        name: 'projectName',
        type: targetDir ? null : 'text',
        message: 'Project name:',
        initial: defaultProjectName,
        onState: (state) => (targetDir = String(state.value).trim() || defaultProjectName)
      },
      {
        name: 'shouldOverwrite',
        type: () => (canSkipEmptying(targetDir) || forceOverwrite ? null : 'confirm'),
        message: () => {
          const dirForPrompt = targetDir === '.'
            ? 'Current directory'
            : `Target directory "${targetDir}"`;

          return `${dirForPrompt} is not empty. Remove existing files and continue?`;
        }
      },
      {
        name: 'overwriteChecker',
        type: (prev, values) => {
          if (values.shouldOverwrite === false) {
            throw new Error('Operation cancelled');
          }

          return null;
        }
      },
      {
        name: 'packageName',
        type: () => (isValidPackageName(targetDir) ? null : 'text'),
        message: 'Package name:',
        initial: () => toValidPackageName(targetDir),
        validate: (dir) => isValidPackageName(dir) || 'Invalid package.json name',
      },
    ];
  }
}
