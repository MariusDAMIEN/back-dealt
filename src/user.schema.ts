import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"

@Schema()
export class User {
    @Prop()
    email: string;
    @Prop()
    name: string;
    @Prop()
    access_token: string;
    @Prop()
    token_type: string;
}
export const UserSchema = SchemaFactory.createForClass(User);