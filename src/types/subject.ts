import {ITeacher} from "./teacher";

export interface ISubject {
    id: number,
    name: string,
    office: string,
    teacher: ITeacher
}