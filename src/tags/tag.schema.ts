import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import * as mongoose from 'mongoose';
import { User } from "../user.schema";

import { HydratedDocument } from 'mongoose';

export type TagDocument = HydratedDocument<Tag>;

@Schema({ timestamps: true })
export class Tag {
    @Prop()
    title: string;
    @Prop()
    color: string;
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: User;
}
export const TagSchema = SchemaFactory.createForClass(Tag);   