import { Study } from "./aboutStudy";

export interface User {
    id: number;
    name: string;
    studies: Study[];
}