import { User } from '../models/User';

export abstract class AbstractUserRepository {
  abstract saveUser(user: User): Promise<void>;

  abstract getAllUsers(): Promise<User[]>;

  abstract getUserById(id: string): Promise<User | null>;

  abstract updateUser(
    id: string,
    firstName?: string,
    lastName?: string,
    email?: string,
    phoneNumber?: string
  ): Promise<User | null>;
}
