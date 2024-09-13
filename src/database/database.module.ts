import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";
import defaultMikroOrmConfig from "src/configs/mikro-orm.config";

@Module({
  imports: [MikroOrmModule.forRootAsync(defaultMikroOrmConfig)],
})
export class DatabaseModule {}
