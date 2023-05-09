import {IGroup} from "./group";
import {ISubject} from "./subject";

export interface ILevel {
    id: number,
    text: string,
    groups: IGroup[]
    subjects: ISubject[]
}