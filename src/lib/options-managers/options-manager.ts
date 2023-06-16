import minimist from 'minimist';
import { kebabCaseToCamelcase } from '@/utils/formatter.js';
import ZodValidator from '@/lib/validators/zod-validator.js';
import { Options, OptionsValidator } from '@/lib/options-managers/types.js';

export default class OptionsManager {
  private _options: Options = { _: [] };

  constructor() {
    const argv = minimist(process.argv.slice(2), {
      string: ['_'],
      boolean: true,
    });

    const preparedOptions = this.prepareArgs(argv);

    const optionsValidator = new ZodValidator<minimist.ParsedArgs, Options>(OptionsValidator);

    const result = optionsValidator.validate(preparedOptions);

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
