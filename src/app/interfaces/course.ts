import { Student } from '../interfaces/student';

export interface Course {
    _id?: string;
    name: string;
    start: string;
    duration: string;
    registrations: Array<string>;
}
