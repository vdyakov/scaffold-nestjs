import { SomeZodObject } from 'zod';
import { Validator, ValidatorResponse } from '@/lib/validators/types';

export default class ZodValidator<V, R> implements Validator<V, R> {
  constructor(
    private readonly zodObject: SomeZodObject,
  ) {}

  validate(options: V): ValidatorResponse<R> {
    const result = this.zodObject.safeParse(options);

    if (!result.success) {
      return {
        success: false,
        errors: result.error.formErrors.fieldErrors,
      };
    }

    return {
      success: true,
      data: result.data as R,
    };
  }
}
