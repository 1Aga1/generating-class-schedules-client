import request from "./index";
import {ISubject} from "../types/subject";

class SubjectApi {
    getSubjects = () => request.get<ISubject[]>('/subjects')

    getSubject = (subjectId: number) => request.get<ISubject>('/subject/'+subjectId)

    createSubject = (name: string, teacher_id: number) => request.post<ISubject>('/subject/create', {
        name, teacher_id
    })

    editSubject = (subject_id: number, name: string, teacher_id: number) => request.post<ISubject>('/subject/edit', {
        subject_id, name, teacher_id
    })

    removeSubject = (subject_id: number) => request.delete('/subject/remove', {
        subject_id
    })
}

// eslint-disable-next-line
export default new SubjectApi()