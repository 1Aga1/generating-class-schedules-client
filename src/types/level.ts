import {IGroup} from "./group";

export interface ILevel {
    id: number,
    text: string,
    groups: IGroup[]
    subjects: {
        id: number
        level: number,
        subject: {
            id: number,
            name: string,
            office: string
        }
    }[]
}