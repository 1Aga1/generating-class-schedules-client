import request from "./index";

class ScheduleParamApi {
    addParam = (schedule_id: number, group_id: number, subject_id: number, number: number) =>
        request.post('/schedule_param/add', {schedule_id, group_id, subject_id, number})

    removeParam = (schedule_id: number, group_id: number, subject_id: number, number: number) =>
        request.delete('/schedule_param/remove', {schedule_id, group_id, subject_id, number})
}

export default new ScheduleParamApi()