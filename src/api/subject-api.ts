import request from "./index";
import {ISubject} from "../types/subject";

class SubjectApi {
    getSubjects = () => request.get<ISubject[]>('/subjects')
    getSubject = (subjectId: number) => request.get<ISubject>('/subject/'+subjectId)

    createSubject = (name: string, office: string) => request.post<ISubject>('/subject/create', {
        name, office
    })

    editSubject = (subject_id: number, name: string, office: string) => request.post<ISubject>('/subject/edit', {
        subject_id, name, office
    })

    removeSubject = (subject_id: number) => request.delete('/subject/remove', {
        subject_id
    })
}

export default new SubjectApi()