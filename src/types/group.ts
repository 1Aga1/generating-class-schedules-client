export interface IGroup {
    id: number,
    name: string,
    course: number,
    subjects: IGroupSubject[]
}

export interface IGroupSubject {
    id: number
    group_id: number,
    subject: {
        id: number,
        teacher: string
        name: string,
    }
}