import request from "./index";
import {ITeacher} from "../types/teacher";

class TeacherApi {
    getTeachers = () => request.get<ITeacher[]>('/teachers')

    getTeacher = (teacherId: number) => request.get<ITeacher>('/teacher/'+teacherId)

    createTeacher = (fullname: string) => request.post<ITeacher>('/teacher/create', {
        fullname
    })

    editTeacher = (teacher_id: number, fullname: string) => request.post<ITeacher>('/teacher/edit', {
        teacher_id, fullname
    })

    removeTeacher = (teacher_id: number) => request.delete('/teacher/remove', {
        teacher_id
    })
}

// eslint-disable-next-line
export default new TeacherApi()