import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

import { PayloadJwt } from '@api/shared/interceptors/payload.jwt';
import { LoginDto } from './dto/login.dto';
import { UserService } from '@modules/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService, 
  ) {}

  async login(loginDto: LoginDto) {    
    const {email, password} = loginDto;
    
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    
    const payload: PayloadJwt = { email: user.email, id: user.id };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }
}
