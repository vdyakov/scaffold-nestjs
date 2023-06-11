import minimist from 'minimist';
import { kebabCaseToCamelcase } from '@/utils/formatter.js';
import { Options } from '@/lib/options-managers/types';

export default class OptionsManager {
  private _options: Options = { _: [] };

  constructor() {
    const argv = minimist(process.argv.slice(2), {
      string: ['_'],
      boolean: true,
    });

    Object.keys(argv).forEach((key: string) => {
      const preparedKey: string = kebabCaseToCamelcase(key);

      this._options[preparedKey] = argv[key];
    });
  }

  public get options(): Options {
    return this._options;
  }
}
