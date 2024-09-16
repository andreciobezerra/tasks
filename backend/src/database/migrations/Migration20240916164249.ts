import { Migration } from '@mikro-orm/migrations';

export class Migration20240916164249 extends Migration {

  override async up(): Promise<void> {
    this.addSql('create table "job_run" ("id" serial primary key, "created_at" timestamptz not null default current_timestamp, "updated_at" timestamptz not null default current_timestamp, "name" timestamptz not null, "status" varchar(255) not null, "finished_at" timestamptz null);');
  }

}
