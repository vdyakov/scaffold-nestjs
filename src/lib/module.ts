import Questionnaire from '@/lib/questionnaire.js';
import Generator from '@/lib/generator.js';

export default abstract class Module<T> {
  public abstract get questionnaire(): Questionnaire<T>;

  public abstract get generator(): Generator<T>;
}
