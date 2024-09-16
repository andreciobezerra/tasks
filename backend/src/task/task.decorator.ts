import { SetMetadata } from "@nestjs/common";

export const TaskDecoratorSymbol = Symbol("TASK_DECORATOR");
export const Task = () => SetMetadata(TaskDecoratorSymbol, true);
