import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Session } from './session.schema';

@Injectable()
export class SessionService {
    constructor(
        @InjectModel(Session.name) private sessionModel: Model<Session>
    ) { }

    async findAll(token: string): Promise<Session> {
        const tre = await this.sessionModel.find().exec();
        return this.sessionModel.findOne({ sessionToken: token }).exec();
    }

    async findBySessionToken(token: string): Promise<Session[]> {
        return this.sessionModel.find().populate('user', 'user').exec();
    }

}
