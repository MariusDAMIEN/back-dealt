import { User } from '../user.schema';

export class CreateTagDto {
    title: string;
    color: string;
    user: User;
}