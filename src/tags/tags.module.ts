import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Tag, TagSchema } from './Tag.schema';
import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';
import { User, UserSchema } from 'src/user.schema';
import { Session, SessionSchema } from 'src/session.schema';
import { SessionService } from 'src/sessions.service';

//import { Tag, TagSchema } from 

@Module({
    imports: [MongooseModule.forFeature([{ name: Tag.name, schema: TagSchema }]),
    MongooseModule.forFeature([{ name: Session.name, schema: SessionSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ],
    controllers: [TagsController],
    providers: [TagsService, SessionService],
})
export class TagsModule { }