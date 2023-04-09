export default abstract class Generator<T = {}> {
  protected answers: T = {} as T;

  async generate(): Promise<void> {
    this.start();

    this.answers = await this.prompting();
    await this.writing();
    await this.install();

    this.end();
  }

  protected abstract start(): void;

  protected abstract prompting(): Promise<T>;

  protected abstract writing(): void;

  protected abstract install(): void;

  protected abstract end(): void;
}
