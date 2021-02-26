import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import * as bcrypt from 'bcrypt';
import { AuthCredentialsDto } from "./dto/auth-credentials-dto";
import { User } from "./user.entity";


@EntityRepository(User)
export class UserRepository extends Repository<User> {

  async signUp(authCredendialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredendialsDto;

    const user = new User();
    user.username = username;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);


    try {
      await user.save();

    } catch (error) {
      console.log(error)
      if (error.code === '23505') {
        throw new ConflictException('User already exist')
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
