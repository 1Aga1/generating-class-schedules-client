import request from "./index";
import {IGroup, IGroupSubject} from "../types/group";


class GroupApi {
    getGroups = () => request.get<IGroup[]>('/groups')

    getGroup = (groupId: number) => request.get<IGroup>('/group/'+groupId)

    createGroup = (name: string, course: number) => request.post<IGroup>('/group/create', {name, course})

    editGroup = (group_id: number, name: string, course: number) => request.post<IGroup>('/group/edit', {
        group_id, name, course
    })

    removeGroup = (group_id: number) => request.delete('/group/remove', {
        group_id
    })

    addSubject = (group_id: number, subject_id: number) => request.post('/group_subject/add', {
        group_id, subject_id
    })

    removeSubject = (group_id: number, subject_id: number) => request.delete('/group_subject/remove', {
        group_id, subject_id
    })

    getGroupSubjects = () => request.get<IGroupSubject[]>('/group_subjects')
}

export default new GroupApi()