import { Injectable } from "@nestjs/common";
import { ITask } from "./task.interface";

@Injectable()
export class TaskService {
  constructor() {}

  setCron(task: ITask) {
    // TODO: set the cron
  }
}
