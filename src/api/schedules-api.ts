import request from "./index";
import {ISchedule} from "../types/schedule";


class SchedulesApi {
    getSchedules = () => request.get<ISchedule[]>('/schedules');

    getSchedule = (scheduleId: string | number) => request.get<ISchedule>('/schedule/'+scheduleId);

    createSchedule = (date: string) => request.post<ISchedule>('/schedule/create', {
        date
    })

    editSchedule = (schedule_id: number, date: string) => request.post<ISchedule>('/schedule/edit', {
        schedule_id, date
    })

    removeSchedule = (schedule_id: number) => request.delete('/schedule/remove', {
        schedule_id
    })

    uploadSchedule = (formData: FormData) => request.post('/schedule/upload', formData)

    changeVisibility = (schedule_id: number, visible: boolean) => request.post<ISchedule>('/schedule/change_visibility', {
        schedule_id, visible
    })
}
// eslint-disable-next-line
export default new SchedulesApi()