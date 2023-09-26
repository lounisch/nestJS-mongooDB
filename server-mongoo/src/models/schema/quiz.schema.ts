/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Question } from './question.schema';

export type QuizDocument = Quiz & Document;

@Schema()
export class Quiz {
    
  @Prop({ required: true , unique:true})
  name: string;

  @Prop()
  description?: string;

  @Prop({default: new Date()})
  updatedDate?: Date;

  @Prop({ required: true })
  timeAllowed: number;

  @Prop([Question]) 
  questions: Question[];

}

export const QuizSchema = SchemaFactory.createForClass(Quiz);
