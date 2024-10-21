import { User } from "../models/User";
import { getCreatedAt4DigitShortCode } from "../utils/getCreatedAt4DigitShortCode";
import { BadRequestError, NotFoundError } from "../utils/responseHandler";
import MailService from "./MailService";
import jwt from 'jsonwebtoken';

class AuthService {

  public async requestCode(email: string): Promise<void> {
    if (!email) {
      throw new BadRequestError('Email não fornecido.');
    }

    const user = await User.findOne({ email });
    if (!user) {
      throw new NotFoundError('Usuário não encontrado.');
    }

    const code = getCreatedAt4DigitShortCode();
    const codeExpiration: Date = new Date(Date.now() + 10 * 60 * 1000);

    user.confirmationCode = code;
    user.codeExpiration = codeExpiration;

    await user.save();

    try {
      await MailService.sendMailConfirmationShortCode(user.email, code);
    } catch (error) {
      throw new Error('Falha ao enviar o email de confirmação.');
    }
  }

  public async getUserConfirmationVerificationCode(email: string, shortCode: string): Promise<string> {
    const user = await User.findOne({ email, confirmationCode: shortCode });

    if (!user) {
      throw new NotFoundError('Usuário não encontrado ou código de confirmação inválido.');
    }

    const currentTime = new Date();
    if (user.codeExpiration && currentTime > user.codeExpiration) {
      throw new BadRequestError('O código de confirmação expirou.');
    }

    const token = this.generateUserToken(String(user._id), user.role)
    return token;
  }

  private generateUserToken(userId: string, role: string) {
    const JWT_SECRET = String(process.env.JWT_SECRET)
    const token = jwt.sign(
      {
        id: userId,
        role,
      },
      JWT_SECRET,
      { expiresIn: '182d' }
    );
    return token;
  }
}

export default new AuthService();
