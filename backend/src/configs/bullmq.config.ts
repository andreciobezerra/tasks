import { BullRootModuleOptions, RegisterQueueOptions } from "@nestjs/bullmq";

export const bullConfigs: BullRootModuleOptions = {
  connection: {
    host: "localhost",
    port: 6379,
  },
};

export const tasksQueueName = Symbol("tasks");
export const tasksQueueConfigs: RegisterQueueOptions = {
  name: tasksQueueName.toString(),
};
