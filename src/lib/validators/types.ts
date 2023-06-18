export interface ValidatorResponse<T = {}> {
  success: boolean,
  errors?: any,
  data?: T,
}

export interface Validator {
  validate<T, R>(value: T): ValidatorResponse<R>,
}
