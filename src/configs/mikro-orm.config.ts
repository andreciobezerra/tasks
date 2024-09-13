import { EntityGenerator } from "@mikro-orm/entity-generator";
import { Migrator } from "@mikro-orm/migrations";
import { MikroOrmModuleAsyncOptions } from "@mikro-orm/nestjs/typings";
import { PostgreSqlDriver } from "@mikro-orm/postgresql";
import { TsMorphMetadataProvider } from "@mikro-orm/reflection";
import { SqlHighlighter } from "@mikro-orm/sql-highlighter";
import { ConfigService } from "@nestjs/config";

const defaultMikroOrmConfig: MikroOrmModuleAsyncOptions = {
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
    debug: true,
    highlighter: new SqlHighlighter(),
    metadataProvider: TsMorphMetadataProvider,
    registerRequestContext: false,
    extensions: [Migrator, EntityGenerator],
    driver: PostgreSqlDriver,
  }),
};

export default defaultMikroOrmConfig;
