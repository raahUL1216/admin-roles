import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigModule } from '../config/typeorm/typeorm.module';
import { Todo } from '../entities/todo.entity';
import { User } from '../entities/user.entity';
import { DatabaseAdminsRepository } from './todo.repository';
import { DatabaseUserRepository } from './user.repository';

@Module({
  imports: [TypeOrmConfigModule, TypeOrmModule.forFeature([Todo, User])],
  providers: [DatabaseAdminsRepository, DatabaseUserRepository],
  exports: [DatabaseAdminsRepository, DatabaseUserRepository],
})
export class RepositoriesModule {}
