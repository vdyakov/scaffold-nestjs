import ora from 'ora';
import chalk from 'chalk';
import { join } from 'path';
import { AbstractRunner } from '../runners/runner.js';
import { PackageManagerCommands } from './types';

export abstract class AbstractPackageManager {
  constructor(protected runner: AbstractRunner) {}

  public async install(directory: string) {
    const spinner = ora({
      spinner: {
        interval: 120,
        frames: ['▹▹▹▹▹', '▸▹▹▹▹', '▹▸▹▹▹', '▹▹▸▹▹', '▹▹▹▸▹', '▹▹▹▹▸'],
      },
      text: 'Installation in progress...',
    });

    spinner.start();

    try {
      const commandArgs = `${this.cli.install} ${this.cli.silentFlag}`;
      const collect = true;

      await this.runner.run(
        commandArgs,
        collect,
        join(process.cwd(), directory),
      );

      spinner.succeed();

      console.info('Dependencies successfully installed');
    } catch {
      spinner.fail();

      const commandArgs = this.cli.install;
      const commandToRun = this.runner.rawFullCommand(commandArgs);

      console.error(chalk.red(
        `Packages installation failed!\n Please, try manually run command: ${commandToRun}`
      ));
    }
  }

  public abstract get name(): string;

  public abstract get cli(): PackageManagerCommands;
}
