import { AbstractRunner } from './runner.js';

export class NpmRunner extends AbstractRunner {
  constructor() {
    super('npm');
  }
}
