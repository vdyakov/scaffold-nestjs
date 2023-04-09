import { NpmRunner } from '../runners/npm-runner.js';
import { AbstractPackageManager } from '@/lib/package-managers/package-manager.js';
import { PackageManagerCommands } from '@/lib/package-managers/types';

export class NpmPackageManager extends AbstractPackageManager {
  constructor() {
    const npmRunner = new NpmRunner();

    super(npmRunner);
  }

  public get name() {
    return 'NPM';
  }

  get cli(): PackageManagerCommands {
    return {
      install: 'install',
      add: 'install',
      update: 'update',
      remove: 'uninstall',
      saveFlag: '--save',
      saveDevFlag: '--save-dev',
      silentFlag: '--silent',
    };
  }
}
