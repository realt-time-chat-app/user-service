import { InMemoryRepository } from "./repositories/inMemoryRepository";
import { UserService } from "./services/userService";
import { createServer } from "./api/server";
import { PORT, HOST } from "./config";
import { User } from "./types/user";

const startServer = async () => {
  try {
    const repository = new InMemoryRepository<User>();
    const userService = new UserService(repository);
    const server = createServer(userService);

    server.listen(PORT, () => {
      console.log(`User service running on ${HOST}:${PORT}`);
    });

    process.on("SIGINT", () => {
      console.log("Shutting down server...");
      process.exit(0);
    });

    process.on("SIGTERM", () => {
      console.log("Server terminated.");
      process.exit(0);
    });
  } catch (error) {
    console.error("Error starting the server:", error);
    process.exit(1);
  }
};

startServer();
