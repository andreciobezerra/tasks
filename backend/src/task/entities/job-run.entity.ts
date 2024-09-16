import { Entity, Property } from "@mikro-orm/core";
import { TimeStampEntity } from "../../shared/entities/timestamp.entity";

@Entity()
export class JobRun extends TimeStampEntity {
  @Property()
  name!: Date;

  @Property()
  status: "started" | "running" | "finished";

  @Property({ nullable: true })
  finishedAt?: Date;
}
