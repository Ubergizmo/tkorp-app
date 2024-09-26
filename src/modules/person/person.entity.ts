import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AnimalEntity } from '../animal/animal.entity';
import { ObjectType, Field } from '@nestjs/graphql'; // Importer les décorateurs GraphQL

@ObjectType()
@Entity('person')
export class PersonEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column('varchar', { length: 500 })
  firstName: string;

  @Field()
  @Column('varchar', { length: 500 })
  lastName: string;

  @Field()
  @Column('varchar')
  email: string;

  @Field()
  @Column('varchar')
  phoneNumber: string;

  @Field(() => [AnimalEntity])
  @OneToMany(() => AnimalEntity, (animal) => animal.owner)
  animals: AnimalEntity[];
}
