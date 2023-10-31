import request from "./index";
import {IScheduleParams} from "../types/schedule";

class ScheduleParamApi {
    addParam = (schedule_id: number, group_id: number, subject_id: number, number: number, office: string) =>
        request.post<IScheduleParams>('/schedule_param/add', {schedule_id, group_id, subject_id, number, office})

    removeParam = (schedule_id: number, group_id: number, subject_id: number, number: number) =>
        request.delete('/schedule_param/remove', {schedule_id, group_id, subject_id, number})
}

export default new ScheduleParamApi()