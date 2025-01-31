export interface BaseRepository<T> {
  /**
   * Save a new entity or update an existing one.
   * @param entity - The entity object to save.
   */
  save(entity: T): Promise<void>;

  /**
   * Find an entity by its unique ID.
   * @param id - The ID of the entity to find.
   * @returns The entity object or null if not found.
   */
  findById(id: string): Promise<T | null>;

  /**
   * Retrieve all entities.
   * @returns An array of all entities.
   */
  findAll(): Promise<T[]>;

  /**
   * Find an entity by its email.
   * @param email - The email of the entity to find.
   * @returns The entity object or null if not found.
   */
  findByEmail(email: string): Promise<T | null>;
}