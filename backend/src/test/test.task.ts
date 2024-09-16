import { Injectable } from "@nestjs/common";
import { JobRun } from "src/task/entities/job-run.entity";
import { Task } from "src/task/task.decorator";
import { ITask } from "src/task/task.interface";

@Injectable()
@Task()
export class TestTask implements ITask {
  name = "Test";
  interval = "Xablau";

  constructor() {}
  handle(data: unknown) {
    console.log("data", data);
    return new JobRun();
  }
}
