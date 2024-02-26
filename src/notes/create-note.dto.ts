import { Tag } from '../tags/tag.schema';
import { User } from '../user.schema';

export class CreateNoteDto {
    title: string;
    message: string;
    tags?: Array<{ title: string, color: string }>; // Tags en option
    user: User;
}