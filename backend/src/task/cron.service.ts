import { Injectable, Logger, LoggerService } from "@nestjs/common";
import { ITask } from "./task.interface";
import { SchedulerRegistry } from "@nestjs/schedule";
import { CronJob } from "cron";

@Injectable()
export class CronService {
  constructor(private readonly schedulerRegistry: SchedulerRegistry) {}

  setCron(task: ITask) {
    const job = new CronJob(task.interval, () => {
      Logger.warn(`This will queue the job ${task.name}`);
    });

    this.schedulerRegistry.addCronJob(task.name, job);
    job.start();
  }
}
