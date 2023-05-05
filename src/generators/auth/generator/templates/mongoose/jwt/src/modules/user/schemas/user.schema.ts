import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { RolesEnum } from '@/decorators/roles.decorator';
import { v4 as uuid } from 'uuid';

@Schema()
export class User {
  @Prop({
    type: String,
    default: function genUUID() {
      return uuid();
    },
  })
  _id: string;

  @Prop({
    required: true,
    unique: true,
    type: String,
  })
  email = '';

  @Prop({
    required: true,
    type: String,
  })
  password = '';

  @Prop({
    type: [String],
    required: false,
    default: [RolesEnum.USER],
  })
  roles: RolesEnum[] = [RolesEnum.USER];
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User).set(
  'versionKey',
  false,
);
