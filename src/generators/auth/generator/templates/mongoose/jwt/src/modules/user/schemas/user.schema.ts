import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { RolesEnum } from '@/decorators/roles.decorator';
import { v4 as uuid } from 'uuid';

@Schema()
export class User {
  @Prop({ type: String, default: function genUUID() {
    return uuid();
  }})
  _id: string;

  @Prop({
    required: true,
    unique: true,
    type: String,
  })
  email: string = '';

  @Prop({
    required: true,
    type: String,
  })
  password: string = '';

  @Prop({
    type: [String],
    required: false,
    default: [RolesEnum.USER],
  })
  roles: RolesEnum[] = [];
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User).set('versionKey', false);
