import { Options } from '@/lib/options-managers/types';

export default abstract class Generator<T = {}> {
  async generate(answers: T, args: Options): Promise<void> {
    await this.start(answers);
    await this.writing(answers);

    if (!args.skipInstall)
      await this.install(answers);

    await this.end(answers);
  }

  protected abstract start(answers: T): void;

  protected abstract writing(answers: T): void;

  protected abstract install(answers: T): void;

  protected abstract end(answers: T): void;
}
