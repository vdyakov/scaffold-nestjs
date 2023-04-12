import prompts, { PromptObject } from 'prompts';

export default abstract class Questionnaire<T = {}> {
  public async prompt(): Promise<T> {
    return await prompts(this.questions) as T;
  }

  protected abstract get questions(): PromptObject[];
}
