import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { UserDocument, User } from '@/modules/user/schemas/user.schema';
import SignupDto from '@/modules/auth/dtos/signup.dto';
import UpdateUserDto from '@/modules/user/dtos/update-user.dto';

@Injectable()
export default class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  public async create(user: SignupDto): Promise<User> {
    const newUser = await this.userModel.create({ ...user });

    return newUser.toJSON();
  }

  public async updateById(id: string, data: UpdateUserDto): Promise<User | null> {
    return this.userModel.findByIdAndUpdate(id, { $set: data }).exec();
  }

  public async findById(id: string): Promise<User | null> {
    return  this.userModel.findOne({ _id: id }).exec();
  }

  public async findByEmail(email: string): Promise<User | null> {
    return  this.userModel.findOne({ email }).exec();
  }

  public getAll() {
    return this.userModel.find().exec();
  }
}
