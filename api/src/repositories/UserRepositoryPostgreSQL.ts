import pool from '../database';
import { User } from '../models/User';
import { AbstractUserRepository } from '../models/userRepository';

export class UserRepositoryPostgreSQL extends AbstractUserRepository {
  constructor() {
    super();
  }

  async saveUser(user: User): Promise<void> {
    await pool.query(
      'INSERT INTO users (id, user_Name, first_name, last_name, email, phone_number, profile_picture, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
      [
        user.getId(),
        user.getUserName(),
        user.getFirstName(),
        user.getLastName(),
        user.getEmail(),
        user.getPhoneNumber() ?? null,
        user.getProfilePicture() ?? null,
        user.getCreatedAt(),
      ]
    );
  }

  async getAllUsers(): Promise<User[]> {
    const result = await pool.query('SELECT * FROM users');
    return result.rows.map(this.createUserFromRow);
  }

  async getUserById(id: string): Promise<User | null> {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return null;
    }
    return this.createUserFromRow(result.rows[0]);
  }

  async updateUser(
    id: string,
    firstName?: string,
    lastName?: string,
    email?: string,
    phoneNumber?: string
  ): Promise<User | null> {
    const result = await pool.query(
      'UPDATE users SET first_name = COALESCE($1, first_name), last_name = COALESCE($2, last_name), email = COALESCE($3, email), phone_number = COALESCE($4, phone_number) WHERE id = $5',
      [firstName, lastName, email, phoneNumber, id]
    );
    return result.rows.length ? this.createUserFromRow(result.rows[0]) : null;
  }

  createUserFromRow(row: {
    id: string;
    user_name: string;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string | null;
    profile_picture: string | null;
    created_at: string;
  }): User {
    return new User(
      row.id,
      row.user_name,
      row.first_name,
      row.last_name,
      row.email,
      row.phone_number ?? undefined,
      row.profile_picture ?? undefined,
      new Date(row.created_at)
    );
  }
}
