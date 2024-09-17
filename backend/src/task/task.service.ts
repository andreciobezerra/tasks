import { Processor, WorkerHost } from "@nestjs/bullmq";
import { Logger } from "@nestjs/common";
import { tasksQueueName } from "src/configs/bullmq.config";

@Processor(tasksQueueName.toString())
export class TaskService extends WorkerHost {
  async process(callback: any) {
    this.test();
  }

  private test() {
    setTimeout(() => Logger.debug("xablau"), 30000);
  }
}
