/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


export type QuestionDocument = Question & Document;

@Schema()
export class Question extends Document {
  @Prop({ required: true })
  text: string;

  @Prop({ required: true })
  points: number;

  @Prop({ required: true })
  order: number;

  @Prop({ required: true })
  time: number;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);