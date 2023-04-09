import Generator from '@/lib/builders/generator.js';

export default class Builder {
  generators: Generator[] = [];

  async build(): Promise<void> {
    for (const generator of this.generators) {
      await generator.generate();
    }
  }

  addGenerator(generator: Generator) {
    this.generators.push(generator);
  }
}
