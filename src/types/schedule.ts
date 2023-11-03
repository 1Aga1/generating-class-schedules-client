export interface ISchedule {
    id: number,
    date: any,
    visible: boolean,
    params: IScheduleParams[],
}

export interface IScheduleParams {
    id: number,
    schedule_id: number,
    group_id: number,
    sub_group: string,
    subject_id: number,
    first_half: string,
    number: number,
    office: number
}