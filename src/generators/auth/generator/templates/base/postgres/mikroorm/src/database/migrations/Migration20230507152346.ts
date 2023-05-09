import { Migration } from '@mikro-orm/migrations';

export class Migration20230507152346 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "users" ("id" varchar(255) not null, "email" varchar(255) not null, "password" varchar(255) not null, "roles" text[] not null default \'{user}\', constraint "users_pkey" primary key ("id"));');
    this.addSql('alter table "users" add constraint "users_email_unique" unique ("email");');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "users" cascade;');
  }

}
