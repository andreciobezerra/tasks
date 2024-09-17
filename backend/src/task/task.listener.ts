import { OnQueueEvent, QueueEventsHost, QueueEventsListener } from "@nestjs/bullmq";
import { Logger } from "@nestjs/common";
import { tasksQueueName } from "src/configs/bullmq.config";
import { Job } from "bullmq";

@QueueEventsListener(tasksQueueName.toString())
export class TaskListener extends QueueEventsHost {
  @OnQueueEvent("added")
  onAdded({ name }: Job) {
    Logger.warn(`The job ${name} was added to queue`);
  }

  @OnQueueEvent("active")
  onActive(job: Job) {
    console.log(job);
    Logger.warn(`The job ${job.name} is processing`);
  }

  @OnQueueEvent("completed")
  onCompleted({ name }: Job) {
    Logger.log(`The job ${name} was completed`);
  }

  @OnQueueEvent("error")
  onFailed({ name }: Job) {
    Logger.error(`The job ${name} was failed`);
  }

  @OnQueueEvent("duplicated")
  onDuplicated({ name }: Job) {
    Logger.warn(`The job ${name} was duplicated`);
  }
}
