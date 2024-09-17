import { WorkerHost } from "@nestjs/bullmq";
import { CronExpression } from "@nestjs/schedule";

export interface ITask {
  name: string;
  interval: CronExpression;

  run: (data?: unknown) => Promise<void> | void | any;
}
