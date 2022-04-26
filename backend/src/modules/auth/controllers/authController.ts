import { Request, Response } from 'express'
import { AuthenticateUser } from '../services/authenticate';
import { RefreshToken } from '../services/refreshToken';

export default class AuthController {
  async authenticate(req: Request, res: Response) {
    const { email, password } = req.body;

    const authenticateUserService = new AuthenticateUser();
    const tokens = await authenticateUserService.execute({ email, password });

    return res.status(200).json(tokens)
  }

  async refreshToken(req: Request, res: Response) {
    const { refreshTokenId } = req.body;

    const refreshToken = new RefreshToken();
    const token = await refreshToken.execute(refreshTokenId);

    return res.status(200).json(token);
  }
}
