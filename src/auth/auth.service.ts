import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials-dto';
import { Jwtpaylod } from './jwt-payload.interface';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) { }

  signUp(authCredendialsDto: AuthCredentialsDto): Promise<void> {
    return this.userRepository.signUp(authCredendialsDto)
  }

  async signIn(authCredendialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
    const username = await this.userRepository.validateUserPassword(authCredendialsDto)

    if (!username) {
      throw new UnauthorizedException('Invalid credentials')
    }

    const payload: Jwtpaylod = { username };
    const accessToken = await this.jwtService.sign(payload)
    return { accessToken }
  }

}
