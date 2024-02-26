import { Body, Controller, Get, Post, UseGuards, Request, Delete, Param, Put, Response } from '@nestjs/common';
import { TagsService } from './tags.service';
import { Tag } from './tag.schema';
import { Response as Res } from 'express';
import { CreateTagDto } from './create-tag.dto';

@Controller('tags')
export class TagsController {
    constructor(private readonly tagsService: TagsService) { }

    @Post()
    async create(@Body() createTagDto: CreateTagDto) {
        const note = await this.tagsService.create(createTagDto);
        return note;
    }

    @Get(':id')
    async findAll(@Param('id') id: string): Promise<Tag[]> {
        const ret = await this.tagsService.findByUserId(id)
        return (ret);
    }

    @Delete(':id')
    async deleteOne(@Param('id') id: string) {
        const ret = await this.tagsService.deleteOne(id);
        return (ret);
    }
}