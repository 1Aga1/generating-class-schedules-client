import request from "./index";
import {IGroup} from "../types/group";


class GroupApi {
    getGroups = () => request.get<IGroup[]>('/groups')

    getGroup = (groupId: number) => request.get<IGroup>('/group/'+groupId)

    createGroup = (level_id: number, name: string) => request.post<IGroup>('/group/create', {
        level_id, name
    })

    editGroup = (group_id: number, level_id: number, name: string) => request.post<IGroup>('/group/edit', {
        group_id, level_id, name
    })

    removeGroup = (group_id: number) => request.delete('/group/remove', {
        group_id
    })
}

export default new GroupApi()