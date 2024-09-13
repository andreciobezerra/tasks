import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import { DatabaseModule } from './database/database.module';
import appConfig from "./configs/app.config";

@Module({
  imports: [ConfigModule.forRoot(appConfig), DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
