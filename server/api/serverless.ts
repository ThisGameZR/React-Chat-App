"use strict";

// Read the .env file.
import * as dotenv from "dotenv";
dotenv.config();

// Require the framework
import Fastify from "fastify";
import cors from "@fastify/cors";
import { userRoutes } from "../routes/users";

// Instantiate Fastify with some config
const app = Fastify({
  logger: true,
});

// Register your application as a normal plugin.
app.register(cors, { origin: process.env.CLIENT_URL });
app.register(userRoutes);

app.listen({ port: parseInt(process.env.PORT!) }, () => console.log("Server start on port: " + process.env.PORT!));

export default async (req, res) => {
  await app.ready();
  app.server.emit("request", req, res);
};
