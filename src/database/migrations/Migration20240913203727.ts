import { Migration } from '@mikro-orm/migrations';

export class Migration20240913203727 extends Migration {

  override async up(): Promise<void> {
    this.addSql('create table "job_run" ("id" serial primary key, "created_at" timestamptz not null default current_timestamp, "updated_at" timestamptz not null default current_timestamp, "name" timestamptz not null, "status" varchar(255) not null, "finished_at" timestamptz null);');
  }

  override async down(): Promise<void> {
    this.addSql('drop table if exists "job_run" cascade;');
  }

}
