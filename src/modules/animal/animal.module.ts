import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnimalEntity } from './animal.entity';
import { AnimalService } from './animal.service';
import { AnimalResolver } from './animal.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([AnimalEntity])],
  providers: [AnimalService, AnimalResolver],
  exports: [AnimalService, AnimalResolver],
})
export class AnimalModule {}
