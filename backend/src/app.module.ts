import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import { DatabaseModule } from "./database/database.module";
import { TaskModule } from "./task/task.module";
import appConfig from "./configs/app.config";
import { TestModule } from "./test/test.module";

@Module({
  imports: [ConfigModule.forRoot(appConfig), DatabaseModule, TaskModule, TestModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
