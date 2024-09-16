import { PrimaryKey, Property } from "@mikro-orm/core";

export abstract class TimeStampEntity {
  @PrimaryKey({ autoincrement: true, unique: true, type: "integer" })
  id!: number;

  @Property({ defaultRaw: "current_timestamp" })
  createdAt!: Date;

  @Property({ defaultRaw: "current_timestamp" })
  updatedAt!: Date;
}
