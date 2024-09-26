import { InputType, Field, Int } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { DateScalar } from 'graphql-date-scalars';

@InputType()
export class CreateAnimalInput {
  @Field()
  @IsNotEmpty()
  name: string;

  @Field(() => DateScalar)
  @IsNotEmpty()
  dateOfBirth: Date;

  @Field()
  @IsNotEmpty()
  species: string;

  @Field()
  @IsNotEmpty()
  breed: string;

  @Field()
  @IsNotEmpty()
  color: string;

  @Field()
  @IsNotEmpty()
  weight: number;

  @Field(() => Int)
  @IsNotEmpty()
  ownerId: number;
}
