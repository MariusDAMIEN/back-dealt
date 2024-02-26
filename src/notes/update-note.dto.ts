import { User } from '../user.schema';

export class UpdateNoteDto {
    title?: string;
    message?: string;
    user: User;
    tags?: Array<{ title: string, color: string }>; // Tags en option
}