export interface ISchedule {
    id: number,
    date: any,
    visible: boolean,
    params: IScheduleParams[],
}

export interface IScheduleParams {
    id: number,
    group_id: number,
    schedule_id: number,
    subject_id: number,
    number: number,
    office: number
}