import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport';

@Injectable()
export default class PublicStrategy extends PassportStrategy(Strategy, 'public') {
  constructor() {
    super();
  }

  authenticate(): void {
    return this.success({ [Symbol.for('isPublic')]: true });
  }
}
