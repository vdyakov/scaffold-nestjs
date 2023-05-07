import { Migration } from '@mikro-orm/migrations';

export class Migration20230507130110 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `users` (`id` varchar(255) not null, `email` varchar(255) not null, `password` varchar(255) not null, `roles` text not null default \'user\', primary key (`id`)) default character set utf8mb4 engine = InnoDB;');
    this.addSql('alter table `users` add unique `users_email_unique`(`email`);');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists `users`;');
  }

}
