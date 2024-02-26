import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import * as mongoose from 'mongoose';
import { User } from "./user.schema";

@Schema()
export class Session {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    userId: User;
    @Prop()
    sessionToken: string
}
export const SessionSchema = SchemaFactory.createForClass(Session);