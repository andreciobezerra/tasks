import { Module, OnModuleInit } from "@nestjs/common";
import { DiscoveryModule, DiscoveryService, MetadataScanner, Reflector } from "@nestjs/core";
import { CronService } from "./cron.service";
import { TaskDecoratorSymbol } from "./task.decorator";
import { ScheduleModule } from "@nestjs/schedule";
import { BullModule } from "@nestjs/bullmq";
import { bullConfigs, tasksQueueConfigs } from "src/configs/bullmq.config";
import { TaskListener } from "./task.listener";
import { TaskService } from "./task.service";

@Module({
  imports: [
    DiscoveryModule,
    ScheduleModule.forRoot(),
    BullModule.forRoot(bullConfigs),
    BullModule.registerQueue(tasksQueueConfigs),
  ],
  providers: [CronService, TaskService, TaskListener],
})
export class TaskModule implements OnModuleInit {
  constructor(
    private readonly discoveryService: DiscoveryService,
    private readonly reflector: Reflector,
    private readonly metadataScanner: MetadataScanner,
    private readonly cronService: CronService,
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
        // Get all methods in provider which decorator applied

        this.cronService.setCron({
          ...instance,
          className: instance.constructor.name,
        });
        // Preserve exist metadatas for provider
        providerMetaDatas.forEach(([key, value]) =>
          Reflect.defineMetadata(key, value, instance.constructor),
        );
      });
  }
}
