import minimist, { ParsedArgs } from 'minimist';
import { Validator } from '@/lib/validators/types';
import { Options } from '@/lib/options-managers/types.js';
import { kebabCaseToCamelcase } from '@/utils/formatter.js';

export default class OptionsManager {
  private _options: Options = { _: [] };

  constructor(
    private readonly optionsValidator: Validator,
  ) {
    const argv = minimist(process.argv.slice(2), {
      string: ['_'],
      boolean: true,
    });

    const preparedOptions = this.prepareArgs(argv);

    const result = this.optionsValidator.validate<ParsedArgs, Options>(preparedOptions);

    if (!result.success) {
      throw result.errors;
    }

    this._options = result.data ?? this._options;
  }

  public get options(): Options {
    return this._options;
  }

  private prepareArgs(argv: minimist.ParsedArgs): minimist.ParsedArgs {
    const args: minimist.ParsedArgs = {} as minimist.ParsedArgs;

    Object.keys(argv).forEach((key: string) => {
      const preparedKey: string = kebabCaseToCamelcase(key);

      args[preparedKey] = argv[key];
    });

    if (false === args.interactive && !args.projectName) {
      args.projectName = 'nest-js-project';
    }

    return args;
  }
}
