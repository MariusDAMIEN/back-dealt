import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Note } from './note.schema';
import { CreateNoteDto } from './create-note.dto';
import { UpdateNoteDto } from './update-note.dto';
import { CreateTagDto } from 'src/tags/create-tag.dto';
import { Tag } from 'src/tags/Tag.schema';


@Injectable()
export class NotesService {
    constructor(
        @InjectModel(Note.name) private noteModel: Model<Note>,
        @InjectModel(Tag.name) private tagModel: Model<Tag>, // Injectez le modèle Tag
    ) { }

    private async createTag(tagData: CreateTagDto): Promise<Tag> {
        const pppp = await this.tagModel.findOne({ title: tagData.title })
        if (pppp) {
            return pppp
        }
        const createdTag = await this.tagModel.create(tagData);
        return createdTag;
    }

    async create(createNoteDto: CreateNoteDto): Promise<Note> {
        const tags = createNoteDto.tags || [];

        const tagObjects = await Promise.all(tags.map(tag => {
            const createTagDto: CreateTagDto = {
                user: createNoteDto.user,
                title: tag.title,
                color: ''
            };
            return this.createTag(createTagDto)
        }));
        const createdNote = new this.noteModel({ ...createNoteDto, tags: tagObjects });

        return createdNote.save();
    }


    async update(id: string, updateNoteDto: UpdateNoteDto): Promise<Note | null> {
        const existingNote = await this.noteModel.findById(id);

        if (!existingNote) {
            return null;
        }

        if (updateNoteDto.title) {
            existingNote.title = updateNoteDto.title;
        }

        if (updateNoteDto.message) {
            existingNote.message = updateNoteDto.message;
        }

        const tags = updateNoteDto.tags || [];


        const tagObjects = await Promise.all(tags.map(tag => {
            const createTagDto: CreateTagDto = {
                user: existingNote.user,
                title: tag.title,
                color: ''
            };
            return this.createTag(createTagDto)
        }));

        existingNote.tags = tagObjects;
        const updatedNote = await existingNote.save();

        return updatedNote;
    }


    async findByUserId(id: String): Promise<Note[]> {
        return this.noteModel.find({ user: id }).populate('tags').sort({ createdAt: -1 }).exec();
    }

    async deleteOne(id: String): Promise<Note[]> {
        return this.noteModel.findByIdAndDelete(id);
    }
}
