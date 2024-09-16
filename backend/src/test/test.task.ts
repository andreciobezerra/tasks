import { Injectable, Logger } from "@nestjs/common";
import { CronExpression } from "@nestjs/schedule";
import { Task } from "src/task/task.decorator";
import { ITask } from "src/task/task.interface";

@Injectable()
@Task()
export class TestTask implements ITask {
  name = "Test";
  interval = CronExpression.EVERY_MINUTE;
  private readonly thirtySeconds = 1000 * 30;

  run(data?: unknown) {
    Logger.warn(`Job ${this.name} started`);
    setTimeout(() => Logger.log(`Job ${this.name} finished successlly`), this.thirtySeconds);
  }
}
