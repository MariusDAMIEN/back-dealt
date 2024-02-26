import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import * as mongoose from 'mongoose';
import { User } from "../user.schema";

import { HydratedDocument, now } from 'mongoose';
import { Tag } from "../tags/tag.schema";

export type NoteDocument = HydratedDocument<Note>;

@Schema({ timestamps: true })
export class Note {
    @Prop()
    title: string;
    @Prop()
    message: string;
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: User;
    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }] })
    tags: Tag[];
}

export const NoteSchema = SchemaFactory.createForClass(Note);   