export interface IAuthForm {
    username: string,
    password: string
}

export interface IScheduleForm {
    date: any
}

export interface IGroupForm {
    id: number
    name: string,
    subjects?: {
        value: number,
    }[]
}

export interface ISubjectForm {
    name: string,
    teacherId: number
}

export interface ITeacherForm {
    fullname: string,
}
