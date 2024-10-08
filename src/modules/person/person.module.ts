import { Module } from '@nestjs/common';
import { PersonEntity } from './person.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonService } from './person.service';
import { PersonResolver } from './person.resolver';
import { PersonController } from './person.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PersonEntity])],
  providers: [PersonService, PersonResolver],
  exports: [PersonService, PersonResolver],
  controllers:[PersonController]
})
export class PersonModule {}
