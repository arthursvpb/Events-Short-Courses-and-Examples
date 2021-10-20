import axios from 'axios';
import prismaClient from '../prisma';

import { sign } from 'jsonwebtoken';

const { GITHUB_CLIENT_SECRET, GITHUB_CLIENT_ID, JWT_SECRET } = process.env;

interface IAccessTokenResponse {
  access_token: string;
}

interface IUserResponse {
  id: number;
  avatar_url: string;
  login: string;
  name: string;
}

class AuthenticateUserService {
  async execute(code: string) {
    const url = 'https://github.com/login/oauth/access_token';

    const {
      data: { access_token },
    } = await axios.post<IAccessTokenResponse>(url, null, {
      params: {
        client_id: GITHUB_CLIENT_ID,
        client_secret: GITHUB_CLIENT_SECRET,
        code,
      },
      headers: {
        Accept: 'application/json',
      },
    });

    const response = await axios.get<IUserResponse>(
      'https://api.github.com/user',
      {
        headers: {
          authorization: `Bearer ${access_token}`,
        },
      }
    );

    const { id, avatar_url, login, name } = response.data;

    let user = await prismaClient.user.findFirst({
      where: {
        github_id: id,
      },
    });

    if (!user) {
      user = await prismaClient.user.create({
        data: {
          github_id: id,
          login,
          avatar_url,
          name,
        },
      });
    }

    const token = sign(
      {
        user: {
          name: user.name,
          avatar_url: user.avatar_url,
          id: user.id,
        },
      },
      JWT_SECRET,
      {
        subject: user.id,
        expiresIn: '1d',
      }
    );

    return { token, user };
  }
}

export { AuthenticateUserService };
