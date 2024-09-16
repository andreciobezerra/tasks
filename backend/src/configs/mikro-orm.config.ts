import { defineConfig } from "@mikro-orm/core";
import { EntityGenerator } from "@mikro-orm/entity-generator";
import { Migrator } from "@mikro-orm/migrations";
import { MikroOrmModuleAsyncOptions } from "@mikro-orm/nestjs/typings";
import { PostgreSqlDriver } from "@mikro-orm/postgresql";
import { TsMorphMetadataProvider } from "@mikro-orm/reflection";
import { SqlHighlighter } from "@mikro-orm/sql-highlighter";
import { ConfigService } from "@nestjs/config";
import { config } from "dotenv";

config({ path: "dev-env/.env.development" });

export const defaultMikroOrmConfig: MikroOrmModuleAsyncOptions = {
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => ({
    host: configService.get("DB_HOST"),
    port: configService.get("DB_PORT"),
    user: configService.get("DB_USER"),
    password: configService.get("DB_PASSWORD"),
    dbName: configService.get("DB_NAME"),
    autoLoadEntities: true,
    entities: ["dist/**/*.entity.js"],
    entitiesTs: ["src/**/*.entity.ts"],
    migrations: {
      pathTs: "src/database/migrations",
    },
    debug: true,
    highlighter: new SqlHighlighter(),
    metadataProvider: TsMorphMetadataProvider,
    registerRequestContext: false,
    extensions: [Migrator, EntityGenerator],
    driver: PostgreSqlDriver,
  }),
};

const cliMikroOrmConfig = defineConfig({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  dbName: process.env.DB_NAME,
  entities: ["dist/**/*.entity.js"],
  migrations: {
    pathTs: "src/database/migrations",
    path: "dist/database/migrations",
  },
  extensions: [Migrator],
  driver: PostgreSqlDriver,
});

export default cliMikroOrmConfig;
