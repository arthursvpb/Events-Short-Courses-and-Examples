import { getCustomRepository } from 'typeorm';
import { UserRepositories } from '../repositories/UsersRepositories';

import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

interface IAuthenticateRequest {
  email: string;
  password: string;
}

class AuthenticateUserService {
  async execute({ email, password }: IAuthenticateRequest) {
    const usersRepositories = getCustomRepository(UserRepositories);

    const user = await usersRepositories.findOne({ email: email });

    if (!user) {
      throw new Error('Incorrect Email or Password');
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error('Incorrect Email or Password');
    }

    const token = sign({ email: user.email }, process.env.JWT_SECRET, {
      subject: user.id,
      expiresIn: '1d',
    });

    return token;
  }
}

export { AuthenticateUserService };
