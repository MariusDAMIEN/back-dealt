import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Tag } from './tag.schema';
import { CreateTagDto } from './create-tag.dto';


@Injectable()
export class TagsService {
    constructor(@InjectModel(Tag.name) private tagModel: Model<Tag>) { }

    async create(createTagDto: CreateTagDto): Promise<Tag> {
        const createdTag = new this.tagModel(createTagDto);
        return createdTag.save();
    }

    async findByUserId(id: String): Promise<Tag[]> {
        return this.tagModel.find({ user: id }).sort({ createdAt: -1 }).exec();
    }

    async deleteOne(id: String): Promise<Tag[]> {
        return this.tagModel.findByIdAndDelete(id);
    }
}
