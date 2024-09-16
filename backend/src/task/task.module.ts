import { Module, OnModuleInit } from "@nestjs/common";
import { DiscoveryModule, DiscoveryService, MetadataScanner, Reflector } from "@nestjs/core";
import { TaskDecoratorSymbol } from "./task.decorator";
import { ITask } from "./task.interface";
import { TaskService } from "./task.service";

@Module({
  imports: [DiscoveryModule],
  providers: [TaskService],
})
export class TaskModule implements OnModuleInit {
  constructor(
    private readonly discoveryService: DiscoveryService,
    private readonly reflector: Reflector,
    private readonly taskService: TaskService,
  ) {}

  onModuleInit() {
    return this.discoveryService
      .getProviders()
      .filter((wrapper) => wrapper.isDependencyTreeStatic())
      .filter(({ instance }) => instance && Object.getPrototypeOf(instance))
      .forEach(({ instance }) => {
        const isTaskDecorated = Boolean(
          this.reflector.get(TaskDecoratorSymbol, instance.constructor),
        );

        if (!isTaskDecorated) {
          return;
        }

        const providerMetaDatas = Reflect.getOwnMetadataKeys(instance.constructor).map((key) => [
          key,
          Reflect.getMetadata(key, instance.constructor),
        ]);

        this.taskService.setCron(instance);
        // Preserve exist metadatas for provider
        providerMetaDatas.forEach(([key, value]) =>
          Reflect.defineMetadata(key, value, instance.constructor),
        );
      });
  }
}
