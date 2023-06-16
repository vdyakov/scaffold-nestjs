export interface ValidatorResponse<T = {}> {
  success: boolean,
  errors?: any,
  data?: T,
}

export interface Validator<T = {}, R = {}> {
  validate(value: T): ValidatorResponse<R>,
}
