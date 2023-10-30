export interface IGroup {
    id: number,
    name: string,
    subjects: IGroupSubject[]
}

export interface IGroupSubject {
    id: number
    group_id: number,
    subject: {
        id: number,
        name: string,
    }
}