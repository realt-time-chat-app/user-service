import { v4 as uuidv4 } from "uuid";
import { InMemoryRepository } from "../repositories/inMemoryRepository";
import { User } from "../types/user";

export class UserService {
  private repository: InMemoryRepository<User>;

  constructor(repository: InMemoryRepository<User>) {
    this.repository = repository;
  }

  /**
   * Create a new user
   * @param firstName - The first name of the user
   * @param lastName - The last name of the user
   * @param userName - The unique username of the user
   * @param email - The email of the user
   * @returns The created user object
   */
  async createUser(
    firstName: string,
    lastName: string,
    userName: string,
    email: string
  ): Promise<User> {
    const user: User = {
      id: this.generateId(),
      firstName,
      lastName,
      userName,
      email,
    };
    await this.repository.save(user);
    return user;
  }

  /**
 * Find a user by email (Login)
 * @param email - The email of the user
 * @returns The user object if found, otherwise null
 */
  async loginUser(email: string): Promise<User | null> {
    const users = await this.repository.findAll();
    const user = users.find((u) => u.email === email);
    return user || null;
  }

  /**
   * Get a user by their ID
   * @param id - The unique identifier of the user
   * @returns The user object or null if not found
   */
  async getUserById(id: string): Promise<User | null> {
    return this.repository.findById(id);
  }

  /**
   * Get all users
   * @returns An array of all users
   */
  async getAllUsers(): Promise<User[]> {
    return this.repository.findAll();
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return await this.repository.findByEmail(email);
  }

  /**
   * Generate a unique ID for users
   * @returns A unique string identifier
   */
  private generateId(): string {
    return uuidv4(); // Generate a UUID
  }
}
