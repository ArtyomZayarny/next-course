import { EntityRepository, Repository } from "typeorm";
import { AuthCredentialsDto } from "./dto/auth-credentials-dto";
import { User } from "./user.entity";

@EntityRepository(User)
export class UserRepository extends Repository<User> {

  async signUp(authCredendialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredendialsDto
    const user = new User()
    user.username = username
    user.password = password
    await user.save()

  }
}
