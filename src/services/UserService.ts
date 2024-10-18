import { IUser, User } from "../models/User";
import { BadRequestError, NotFoundError } from "../utils/responseHandler";

class UserService {

  public async createUser(userData: IUser): Promise<IUser> {
    const user = await User.findOne({ email: userData.email });
    if (user) {
      throw new BadRequestError('O email ja foi cadastrado por outro usuário')
    }

    const newUser = await User.create(userData);
    return newUser;
  }

  public async getUserById(userId: string): Promise<IUser> {
    const user = await User.findById(userId);
    if (!user) {
      throw new NotFoundError('Usuário não encontrado.');
    }
    return user;
  }

  public async updateUser(userId: string, updateData: Partial<IUser>): Promise<IUser> {
    const user = await User.findByIdAndUpdate(userId, updateData, { new: true });
    if (!user) {
      throw new NotFoundError('Usuário não encontrado.');
    }
    return user;
  }

  public async deleteUser(userId: string): Promise<void> {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      throw new NotFoundError('Usuário não encontrado.');
    }
  }

  public async getAllUsers(): Promise<IUser[]> {
    return await User.find();
  }
}

export default new UserService();
