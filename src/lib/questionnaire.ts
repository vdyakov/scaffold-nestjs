import prompts, { PromptObject } from 'prompts';
import { Options } from '@/lib/options-managers/types';

export default abstract class Questionnaire<T = {}> {
  public async prompt(args: Options): Promise<T> {
    prompts.override(args);

    return await prompts(this.questions) as T;
  }

  protected abstract get questions(): PromptObject[];
}
