import { Logger } from "@nestjs/common";
import { CronExpression } from "@nestjs/schedule";
import { Task } from "src/task/task.decorator";
import { ITask } from "src/task/task.interface";

@Task()
export class TestTask implements ITask {
  name = "Test";
  interval = CronExpression.EVERY_MINUTE;

  async run() {
    Logger.warn(`Job ${this.name} started`);
    const testPromise = new Promise((resolve, reject) => {
      setTimeout(() => resolve(Logger.log(`Job ${this.name} finished successlly`)), 3000);
    });

    return await testPromise;
  }
}
