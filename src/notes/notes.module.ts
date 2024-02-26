import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Note, NoteSchema } from './note.schema';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';
import { Session, SessionSchema } from 'src/session.schema';
import { User, UserSchema } from 'src/user.schema';
import { Tag, TagSchema } from 'src/tags/Tag.schema';
import { SessionService } from 'src/sessions.service';


@Module({
    imports: [MongooseModule.forFeature([{ name: Note.name, schema: NoteSchema }]),
    MongooseModule.forFeature([{ name: Session.name, schema: SessionSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Tag.name, schema: TagSchema }]),
    ],
    controllers: [NotesController],
    providers: [NotesService, SessionService],
})
export class NotesModule { }