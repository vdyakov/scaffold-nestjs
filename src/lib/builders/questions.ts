import prompts, { PromptObject } from 'prompts';

export default abstract class Questions {
  async prompt<T>(): Promise<T> {
    return await prompts(this.questions) as T;
  }

  abstract get questions(): PromptObject[];
}
