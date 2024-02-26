import { Body, Controller, Get, Post, UseGuards, Request, Delete, Param, Put, Response } from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './create-note.dto';
import { Note } from './note.schema';
import { UpdateNoteDto } from './update-note.dto';
import { Response as Res } from 'express';

@Controller('notes')
export class NotesController {
    constructor(private readonly notesService: NotesService) { }

    @Post()
    async create(@Body() createNoteDto: CreateNoteDto) {
        const note = await this.notesService.create(createNoteDto);

        return note;

    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto) {
        const note = await this.notesService.update(id, updateNoteDto);
        return note;
    }

    //  @UseGuards(AuthGuard)
    @Get(':id')
    async findAll(@Param('id') id: string): Promise<Note[]> {

        const ret = await this.notesService.findByUserId(id)
        return (ret);
    }

    @Delete(':id')
    async deleteOne(@Param('id') id: string) {
        const ret = await this.notesService.deleteOne(id);
        return (ret);
    }
}