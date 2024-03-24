import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type NoteDocument = HydratedDocument<Note>;

@Schema()
export class Note {
  @Prop({ required: true })
  title: string;

  @Prop()
  content: string;

  @Prop()
  status: string;

  @Prop()
  author: string;

  @Prop()
  created_at: Date;

  @Prop()
  updated_at: Date;
}

export const NoteSchema = SchemaFactory.createForClass(Note);
