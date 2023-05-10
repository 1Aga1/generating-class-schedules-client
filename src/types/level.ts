import {IGroup} from "./group";

export interface ILevel {
    id: number,
    text: string,
    groups: IGroup[]
    subjects: ILevelSubject[]
}

export interface ILevelSubject {
    id: number
    level: number,
    subject: {
        id: number,
        name: string,
        office: string
    }
}