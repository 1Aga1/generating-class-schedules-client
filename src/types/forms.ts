export interface IAuthForm {
    username: string,
    password: string
}

export interface IScheduleForm {
    date: any
}

export interface IGroupForm {
    levelId: number,
    name: string
}

export interface ISubjectForm {
    name: string,
    office: string,
    teacherId: number
}

export interface ILevelForm {
    id: number,
    text: string,
    subjects?: {
        value: number,
    }[]
}

export interface ITeacherForm {
    fullname: string,
}
