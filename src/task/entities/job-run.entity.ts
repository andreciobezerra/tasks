import { Entity, Property } from "@mikro-orm/core";
import { TimeStampEntity } from "src/shared/entites/timestamp.entity";

@Entity()
export class JobRun extends TimeStampEntity {
  @Property()
  name!: Date;

  @Property()
  status: "started" | "running" | "finished";

  @Property({ nullable: true })
  finishedAt?: Date;
}
