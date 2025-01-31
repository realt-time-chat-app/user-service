import express, { Request, Response } from "express";
import http from "http";
import { createUserServer } from "./controllers/userController";
import { UserService } from "../services/userService";
import { corsMiddleware } from "../middleware/corsMiddleware";

// Function to configure Express app
const configureExpress = (app: express.Application, rpcServer: any) => {
  app.use(corsMiddleware);
  app.use(express.json());

  app.post("/rpc", (req: Request, res: Response) => {
    Promise.resolve(rpcServer.receive(req.body))
      .then((jsonRPCResponse) => {
        if (jsonRPCResponse) {
          res.json(jsonRPCResponse);
        } else {
          res.sendStatus(204);
        }
      })
      .catch((error) => {
        console.error("Error processing JSON-RPC request:", error);
        res.status(500).json({ error: "Internal server error" });
      });
  });
};

// Main function to create the server
export const createServer = (userService: UserService) => {
  const app = express();
  const httpServer = http.createServer(app);

  // Create the JSON-RPC user server
  const userServer = createUserServer(userService);

  // Configure Express app
  configureExpress(app, userServer);

  return httpServer;
};
