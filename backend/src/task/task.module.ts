import { Module, OnModuleInit } from "@nestjs/common";
import { DiscoveryModule, DiscoveryService, Reflector } from "@nestjs/core";
import { CronService } from "./cron.service";
import { TaskDecoratorSymbol } from "./task.decorator";
import { ScheduleModule } from "@nestjs/schedule";

@Module({
  imports: [DiscoveryModule, ScheduleModule.forRoot()],
  providers: [CronService],
})
export class TaskModule implements OnModuleInit {
  constructor(
    private readonly discoveryService: DiscoveryService,
    private readonly reflector: Reflector,
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

        this.cronService.setCron(instance);
        // Preserve exist metadatas for provider
        providerMetaDatas.forEach(([key, value]) =>
          Reflect.defineMetadata(key, value, instance.constructor),
        );
      });
  }
}
