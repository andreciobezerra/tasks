import { JobRun } from "./entities/job-run.entity";

export interface ITask {
  name: string;
  interval: unknown;

  handle: (data: unknown) => Promise<JobRun> | JobRun;
}
