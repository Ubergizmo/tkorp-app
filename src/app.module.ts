import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { PersonModule } from './modules/person/person.module';
import { AnimalModule } from './modules/animal/animal.module';
import { PersonEntity } from './modules/person/person.entity';
import { AnimalEntity } from './modules/animal/animal.entity';
import { DateScalar } from 'graphql-date-scalars';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      database: 'tkorpdb',
      synchronize: true,
      username: 'root',
      password: '1234',
      entities: [PersonEntity, AnimalEntity],
      logging: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: true,
      resolvers: {
        Date: DateScalar,
      },

    }),
    PersonModule,
    AnimalModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
