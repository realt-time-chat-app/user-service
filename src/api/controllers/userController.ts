import { JSONRPCServer } from "json-rpc-2.0";
import { UserService } from "../../services/userService";
import { userCreateSchema } from "../../validation/userValidation"; // Import the schema

// Function to create the JSON-RPC user server
export const createUserServer = (userService: UserService) => {
  const server = new JSONRPCServer();

  // Define the RPC methods

  /**
   * Create a new user
   * @param params - Object containing user details (e.g., { firstName, lastName, userName, email })
   * @returns User object with an ID
   */
  server.addMethod(
    "createUser",
    async (params: {
      firstName: string;
      lastName: string;
      userName: string;
      email: string;
    }) => {
      // Validate input using Joi schema
      const { error } = userCreateSchema.validate(params);

      if (error) {
        throw new Error(error.details.map(e => e.message).join(", "));
      }

      const { firstName, lastName, userName, email } = params;

      // Call the service method after validation
      return userService.createUser(firstName, lastName, userName, email);
    }
  );

  /**
 * Log in a user by email
 * @param params - Object containing the email (e.g., { email })
 * @returns User object if found, otherwise an error
 */
  server.addMethod("findUserByEmail", async (params: { email: string }) => {
    const { email } = params;

    if (!email) {
      throw new Error("Email is required.");
    }

    const user = await userService.findUserByEmail(email);
    if (!user) {
      throw new Error("User not found.");
    }

    return user; // Return user details
  });

  /**
   * Get a user by ID
   * @param params - Object containing the user ID (e.g., { id })
   * @returns User object or null if not found
   */
  server.addMethod("getUserById", async (params: { id: string }) => {
    const { id } = params;

    try {
      const user = await userService.getUserById(id);

      if (!user) {
        throw new Error("User not found");
      }

      return user; // Return the found user
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error("Error fetching user: " + error.message);
      } else {
        throw new Error("Unknown error occurred");
      }
    }
  });

  /**
   * Get all users
   * @returns Array of all users
   */
  server.addMethod("getAllUsers", async () => {
    return userService.getAllUsers();
  });

  return server;
};
