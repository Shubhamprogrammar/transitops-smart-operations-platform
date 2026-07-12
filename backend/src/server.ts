import { app } from "./app";
import { env } from "./config/env";
import { prisma } from "./config/prisma";
import { logger } from "./utils/logger";

async function main() {
  await prisma.$connect();
  logger.info("Database connected successfully");

  app.listen(env.port, () => {
    logger.info(`Server running on http://localhost:${env.port}`);
  });
}

main().catch((error) => {
  logger.error("Failed to start server", { error });
  process.exit(1);
});

process.on("SIGINT", async () => {
  logger.info("Shutting down gracefully (SIGINT)");
  await prisma.$disconnect();
  logger.info("Database disconnected");
  process.exit(0);
});

process.on("SIGTERM", async () => {
  logger.info("Shutting down gracefully (SIGTERM)");
  await prisma.$disconnect();
  logger.info("Database disconnected");
  process.exit(0);
});
