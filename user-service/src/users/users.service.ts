import { ConflictException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schema/user.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
  ) { }

  async createUser(data: CreateUserDto) {
    try {
      const user = new this.userModel(data);
      this.logger.log(`User email: ${user.email}`);
      return await user.save();

    } catch (error) {
      this.logger.error(`Failed to create user: ${error.message}`);
      throw new Error('Failed to create User: ' + error.message);
    }
  }

  async getUserById(id: string) {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
