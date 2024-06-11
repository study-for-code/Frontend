import { User } from "./User";

export interface Study {
    title: string;
    createAt: Date;
    image: File | null;
    host: User | null;
}