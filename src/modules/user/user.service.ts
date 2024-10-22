import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt'; 
import { CreateUserDto } from './dto/create-user.dto';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  
  async createUser(createUserDto: CreateUserDto): Promise<User> {
      const { email, password } = createUserDto;

      const existingUser = await this.userRepository.findOne({ where: { email } });      
      
      if (existingUser) {
        throw new BadRequestException('User already exists');
      }
      
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = this.userRepository.create({...createUserDto, password: hashedPassword});

      return this.userRepository.save(user);
  }

  async findByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email } });
  }

  async findById(userId: number): Promise<User> {
    return this.userRepository.findOne({ where: { id: userId } });
  }
}
