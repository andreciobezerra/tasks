import { Injectable, Logger } from "@nestjs/common";
import { ITask } from "./task.interface";
import { SchedulerRegistry } from "@nestjs/schedule";
import { CronJob } from "cron";
import { InjectQueue } from "@nestjs/bullmq";
import { tasksQueueName } from "src/configs/bullmq.config";
import { Queue } from "bullmq";

@Injectable()
export class CronService {
  constructor(
    private readonly schedulerRegistry: SchedulerRegistry,
    @InjectQueue(tasksQueueName.toString()) private readonly tasksQueue: Queue<ITask, any, string>,
  ) {}

  setCron(task: ITask) {
    const job = new CronJob(task.interval, () => {
      this.tasksQueue.add(task.name, task);
    });

    this.schedulerRegistry.addCronJob(task.name, job);
    job.start();
  }
}
