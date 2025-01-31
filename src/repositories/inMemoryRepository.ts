import { BaseRepository } from "./baseRepository";

export class InMemoryRepository<T extends { id: string, email?: string }> implements BaseRepository<T> {
  private storage: Map<string, T>; // In-memory storage

  constructor() {
    this.storage = new Map<string, T>();
  }

  /**
   * Save a new entity or update an existing one.
   * @param entity - The entity object to save.
   */
  async save(entity: T): Promise<void> {
    this.storage.set(entity.id, entity);
    console.log("storage", this.storage);
  }

  /**
   * Find an entity by its unique ID.
   * @param id - The ID of the entity to find.
   * @returns The entity object or null if not found.
   */
  async findById(id: string): Promise<T | null> {
    return this.storage.get(id) || null;
  }

  /**
   * Retrieve all entities.
   * @returns An array of all entities.
   */
  async findAll(): Promise<T[]> {
    return Array.from(this.storage.values());
  }

  /**
   * Find an entity by a specific key-value pair.
   * This can be extended for unique fields like `userName`.
   * @param key - The key to search by.
   * @param value - The value to match.
   * @returns The entity object or null if not found.
   */
  async findByKey(key: keyof T, value: T[keyof T]): Promise<T | null> {
    for (const entity of this.storage.values()) {
      if (entity[key] === value) {
        return entity;
      }
    }
    return null;
  }

  /**
   * Find an entity by its email.
   * @param email - The email of the entity to find.
   * @returns The entity object or null if not found.
   */
  async findByEmail(email: string): Promise<T | null> {
    for (const entity of this.storage.values()) {
      if (entity.email === email) {
        return entity;
      }
    }
    return null;
  }
}
