import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { AuthLogin } from './auth.interface';
import * as bcrypt from 'bcrypt';
import { RegisterNoteDto } from 'src/dto/register-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private authModel: Model<User>) {}

  async login(user: AuthLogin): Promise<string> {
    const auth = await this.authModel.findOne({ username: user.username });
    if (!auth) throw new Error('Unknow user.');
    const passed = await bcrypt.compare(user.password, auth.password);
    if (!passed) throw new Error('Credentials is false');

    const payload = {
      id: auth._id,
      username: auth.username,
      email: auth.email,
    };

    return await new JwtService().signAsync(payload, {
      secret: process.env.JWT_SECRET,
    });
  }

  async signUp(user: RegisterNoteDto): Promise<User> {
    user.password = (await bcrypt.hash(user.password, 10)).toString();
    const authModel = new this.authModel(user);
    return authModel.save();
  }
}
