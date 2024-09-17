import { Processor } from "@nestjs/bullmq";
import { applyDecorators, Injectable, SetMetadata } from "@nestjs/common";

export const TaskDecoratorSymbol = Symbol("TASK_DECORATOR");
export const Task = () => applyDecorators(Injectable(), SetMetadata(TaskDecoratorSymbol, true));
